import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Zone } from '../entities/Zone';
import { MeetingRoom } from '../entities/MeetingRoom';

export class ZoneController {
  // 获取所有区域
  static async getAllZones(_req: Request, res: Response) {
    try {
      const zoneRepository = AppDataSource.getRepository(Zone);
      const zones = await zoneRepository.find({ relations: ['room', 'seats'] });
      res.status(200).json(zones);
    } catch (error) {
      res.status(500).json({ message: '获取区域列表失败', error: (error as Error).message });
    }
  }

  // 获取单个区域详情
  static async getZoneById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const zoneId = req.params.id;
      const zoneRepository = AppDataSource.getRepository(Zone);
      const zone = await zoneRepository.findOne({
        where: { id: zoneId },
        relations: ['room', 'seats'],
      });

      if (!zone) {
        res.status(404).json({ message: '区域未找到' });
        return;
      }

      res.status(200).json(zone);
    } catch (error) {
      next(error);
    }
  }

  // 创建新区域
  static async createZone(req: Request, res: Response) {
    try {
      const { name, category, capacity, roomId } = req.body;
      const zoneRepository = AppDataSource.getRepository(Zone);
      const roomRepository = AppDataSource.getRepository(MeetingRoom);

      const room = await roomRepository.findOne({ where: { id: roomId } });
      if (!room) {
        res.status(404).json({ message: '会议室未找到' });
        return;
      }

      const newZone = zoneRepository.create({ name, category, capacity, room });
      await zoneRepository.save(newZone);

      res.status(201).json(newZone);
    } catch (error) {
      res.status(500).json({ message: '创建区域失败', error: (error as Error).message });
    }
  }

  // 更新区域信息
  static async updateZone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const zoneId = req.params.id;
      const { name, category, capacity, roomId } = req.body;
      const zoneRepository = AppDataSource.getRepository(Zone);
      const roomRepository = AppDataSource.getRepository(MeetingRoom);

      const zone = await zoneRepository.findOne({ where: { id: zoneId } });
      if (!zone) {
        res.status(404).json({ message: '区域未找到' });
        return;
      }

      const room = await roomRepository.findOne({ where: { id: roomId } });
      if (!room) {
        res.status(404).json({ message: '会议室未找到' });
        return;
      }

      zone.name = name;
      zone.category = category;
      zone.capacity = capacity;
      zone.room = room;

      await zoneRepository.save(zone);

      res.status(200).json(zone);
    } catch (error) {
      next(error);
    }
  }

  // 删除区域
  static async deleteZone(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const zoneId = req.params.id;
      const zoneRepository = AppDataSource.getRepository(Zone);

      const zone = await zoneRepository.findOne({ where: { id: zoneId } });
      if (!zone) {
        res.status(404).json({ message: '区域未找到' });
        return;
      }

      await zoneRepository.remove(zone);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}