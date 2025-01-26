import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { MeetingRoom } from '../entities/MeetingRoom';

export class MeetingRoomController {
  // 获取所有会议室
  static async getAllRooms(req: Request, res: Response) {
    try {
      // 打印日志以确认是否进入此方法
      console.log('Fetching all meeting rooms...');
      
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      // 打印日志以确认是否进入此方法
      console.log('Room repository:', roomRepository);

      const rooms = await roomRepository.find();
      console.log('Fetched rooms:', rooms);
      // 打印获取到的会议室列表

      res.json(rooms);
    } catch (error) {
      console.error('Error fetching meeting rooms:', error);

      if (error instanceof Error) {
        res.status(500).json({
          message: '获取会议室列表失败',
          error: {
            message: error.message, // Error message
            stack: error.stack,     // Stack trace
            name: error.name,       // Error name (e.g., TypeError, ReferenceError)
          },
        });
      } else {
        res.status(500).json({
          message: '获取会议室列表失败',
          error: {
            message: 'An unknown error occurred',
          },
        });
      }
    }
  }

  // 创建会议室
  static async createRoom(req: Request, res: Response) {
    try {
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      const newRoom = roomRepository.create(req.body);
      await roomRepository.save(newRoom);
      res.status(201).json(newRoom);
    } catch (error) {
      res.status(500).json({ message: '创建会议室失败', error });
    }
  }

  // 获取单个会议室
  static async getRoomById(req: Request, res: Response) {
    try {
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      const room = await roomRepository.findOneBy({ id: req.params.id });
      if (room) {
        res.json(room);
      } else {
        res.status(404).json({ message: '会议室未找到' });
      }
    } catch (error) {
      res.status(500).json({ message: '获取会议室失败', error });
    }
  }

  // 更新会议室
  static async updateRoom(req: Request, res: Response) {
    try {
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      const room = await roomRepository.findOneBy({ id: req.params.id });
      if (room) {
        roomRepository.merge(room, req.body);
        const result = await roomRepository.save(room);
        res.json(result);
      } else {
        res.status(404).json({ message: '会议室未找到' });
      }
    } catch (error) {
      res.status(500).json({ message: '更新会议室失败', error });
    }
  }

  // 删除会议室
  static async deleteRoom(req: Request, res: Response) {
    try {
      const roomRepository = AppDataSource.getRepository(MeetingRoom);
      const result = await roomRepository.delete(req.params.id);
      if (result.affected === 1) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: '会议室未找到' });
      }
    } catch (error) {
      res.status(500).json({ message: '删除会议室失败', error });
    }
  }
}