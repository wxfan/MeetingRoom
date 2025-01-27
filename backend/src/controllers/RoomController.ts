import { Request, Response,NextFunction } from 'express';
import { AppDataSource } from '../data-source'; // 导入数据源
import { MeetingRoom } from '../entities/MeetingRoom';

export class RoomController {
  // 获取所有会议室
  static async getAllRooms(_req:Request, res: Response) {
    
    try {
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      const rooms = await roomRepository.find({ relations: ['zones'] });
      res.status(200).json(rooms);
    } catch (error) {
      res.status(500).json({ message: '获取会议室列表失败', error: (error as Error).message });
    }
  }

  static async getRoomById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roomId = req.params.id;
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      const room = await roomRepository.findOne({
        where: { id: roomId },
        relations: ['zones'],
      });

      if (!room) {
        res.status(404).json({ message: '会议室未找到' });
        return;
      }

      res.status(200).json(room);
    } catch (error) {
      next(error); // 将错误传递给 Express 的错误处理中间件
    }
  }

  // 创建新会议室
  static async createRoom(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const roomRepository = AppDataSource.getRepository(MeetingRoom);

      const newRoom = roomRepository.create({ name });
      await roomRepository.save(newRoom);

      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ message: '创建会议室失败', error: (error as Error).message });
    }
  }

  // 更新会议室信息
  static async updateRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roomId = req.params.id;
      const { name } = req.body;
      const roomRepository = AppDataSource.getRepository(MeetingRoom);

      const room = await roomRepository.findOne({ where: { id: roomId } });
      if (!room) {
        res.status(404).json({ message: '会议室未找到' });
        return;
      }

      room.name = name;
      await roomRepository.save(room);

      res.status(200).json(room);
    } catch (error) {
      next(error); // 将错误传递给 Express 的错误处理中间件
    }
  }

  static async deleteRoom(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const roomId = req.params.id;
      const roomRepository = AppDataSource.getRepository(MeetingRoom);

      const room = await roomRepository.findOne({ where: { id: roomId } });
      if (!room) {
        res.status(404).json({ message: '会议室未找到' });
        return;
      }

      await roomRepository.remove(room);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error); // 将错误传递给 Express 的错误处理中间件
    }
  }
}