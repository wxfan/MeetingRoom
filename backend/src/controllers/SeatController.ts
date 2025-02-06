import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Seat } from '../entities/Seat';
import { Zone } from '../entities/Zone';
import { Person } from '../entities/Person';
import { MeetingRoom } from '../entities/MeetingRoom';
import { Assignment } from '../entities/Assignment';

export class SeatController {
  // 获取所有座位
  static async getAllSeats(_req: Request, res: Response) {
    try {
      const seatRepository = AppDataSource.getRepository(Seat);
      const seats = await seatRepository.find({ relations: ['zone', 'assignments', 'maintenances'] });
      res.status(200).json(seats);
    } catch (error) {
      res.status(500).json({ message: '获取座位列表失败', error: (error as Error).message });
    }
  }

  // 获取单个座位详情
  static async getSeatById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const seatId = req.params.id;
      const seatRepository = AppDataSource.getRepository(Seat);
      const seat = await seatRepository.findOne({
        where: { id: seatId },
        relations: ['zone', 'assignments', 'maintenances'],
      });

      if (!seat) {
        res.status(404).json({ message: '座位未找到' });
        return;
      }

      res.status(200).json(seat);
    } catch (error) {
      next(error);
    }
  }

  // 创建新座位
  static async createSeat(req: Request, res: Response) {
    try {
      const { code, status, zoneId } = req.body;
      const seatRepository = AppDataSource.getRepository(Seat);
      const zoneRepository = AppDataSource.getRepository(Zone);

      const zone = await zoneRepository.findOne({ where: { id: zoneId } });
      if (!zone) {
        res.status(404).json({ message: '区域未找到' });
        return;
      }

      const newSeat = seatRepository.create({ code, status, zone });
      await seatRepository.save(newSeat);

      res.status(201).json(newSeat);
    } catch (error) {
      res.status(500).json({ message: '创建座位失败', error: (error as Error).message });
    }
  }

  // 更新座位信息
  static async updateSeat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const seatId = req.params.id;
      const { code, status, zoneId } = req.body;
      const seatRepository = AppDataSource.getRepository(Seat);
      const zoneRepository = AppDataSource.getRepository(Zone);

      const seat = await seatRepository.findOne({ where: { id: seatId } });
      if (!seat) {
        res.status(404).json({ message: '座位未找到' });
        return;
      }

      const zone = await zoneRepository.findOne({ where: { id: zoneId } });
      if (!zone) {
        res.status(404).json({ message: '区域未找到' });
        return;
      }

      seat.code = code;
      seat.status = status;
      seat.zone = zone;

      await seatRepository.save(seat);

      res.status(200).json(seat);
    } catch (error) {
      next(error);
    }
  }

  // 删除座位
  static async deleteSeat(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const seatId = req.params.id;
      const seatRepository = AppDataSource.getRepository(Seat);

      const seat = await seatRepository.findOne({ where: { id: seatId } });
      if (!seat) {
        res.status(404).json({ message: '座位未找到' });
        return;
      }

      await seatRepository.remove(seat);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // POST /api/seats/assign
  static async assignSeats(req: Request, res: Response): Promise<void> {
    const { roomId } = req.body;

    try {
      // 1. 获取所有待分配人员
      const people = await AppDataSource.getRepository(Person).find();   


      // 2. 获取会议室布局
      const room = await AppDataSource.getRepository(MeetingRoom).findOne({
        where: { id: roomId },
        relations: ['zones', 'zones.seats'],
      });

      if (!room) {
        res.status(404).json({ message: 'Meeting room not found' });
        return;
      }

      // 3. 按策略分组人员
      const groups = SeatController.groupPeople(people);     
      console.log("groups"); 
      console.log(groups);  

      

      // 4. 分配座位算法
      const assignments = [];
      for (const zone of room.zones) {
        const group = groups.find((g) => g.key === zone.category);
        console.log("group");
        console.error(group);
        if (!group) continue;

        const seats = zone.seats.slice(0, group.people.length);
        console.log("seats");
        console.error(seats);
        assignments.push(...SeatController.assignPeopleToSeats(group.people, seats));
      }

      // 5. 保存到数据库
      await AppDataSource.getRepository(Assignment).save(assignments);

      res.status(200).json({ message: 'Seats assigned successfully', assignments });
    } catch (error) {
      res.status(500).json({ message: 'Failed to assign seats', error: (error as Error).message });
    }
  }

  // 分组逻辑
  private static groupPeople(people: Person[]) {
    const groups = new Map<string, Person[]>();
    for (const person of people) {
      const department = person.department;
      const key = department.code; // Assuming `department` is of type `Department`
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(person);
    }
    return Array.from(groups.entries()).map(([key, people]) => ({ key, people }));
  }

  // 分配座位逻辑
  private static assignPeopleToSeats(people: Person[], seats: any[]) {
    return people.map((person, index) => {
      const seat = seats[index];
      return new Assignment(seat, person, 'auto', `Assigned by ${seat.zone.category} strategy`);
    });
  }

}