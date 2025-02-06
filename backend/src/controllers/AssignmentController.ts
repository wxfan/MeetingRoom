import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Assignment } from '../entities/Assignment';

export class AssignmentController {
  // 获取所有分配记录
  static async getAllAssignments(_req: Request, res: Response) {
    try {
      const assignmentRepository = AppDataSource.getRepository(Assignment);
      const assignments = await assignmentRepository.find();
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: '获取分配记录失败', error: (error as Error).message });
    }
  }

  // 根据ID获取分配记录
  static async getAssignmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const assignmentId = req.params.id;
      const assignmentRepository = AppDataSource.getRepository(Assignment);
      const assignment = await assignmentRepository.findOne({
        where: { id: assignmentId }
      });

      if (!assignment) {
        res.status(404).json({ message: '分配记录未找到' });
        return;
      }

      res.status(200).json(assignment);
    } catch (error) {
      next(error);
    }
  }

  // 创建新分配记录
  static async createAssignment(req: Request, res: Response) {
    try {
      const { person, seat, assignmentType, note } = req.body;
      const assignmentRepository = AppDataSource.getRepository(Assignment);

      const newAssignment = new Assignment(seat, person, assignmentType, note);
      await assignmentRepository.save(newAssignment);

      res.status(201).json(newAssignment);
    } catch (error) {
      res.status(500).json({ message: '创建分配记录失败', error: (error as Error).message });
    }
  }

  // 更新分配记录
  static async updateAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const assignmentId = req.params.id;
      const { person, seat, assignmentType, note } = req.body;
      const assignmentRepository = AppDataSource.getRepository(Assignment);

      const assignment = await assignmentRepository.findOne({ where: { id: assignmentId } });
      if (!assignment) {
        res.status(404).json({ message: '分配记录未找到' });
        return;
      }

      assignment.person = person;
      assignment.seat = seat;
      assignment.assignmentType = assignmentType;
      assignment.note = note;
      await assignmentRepository.save(assignment);

      res.status(200).json(assignment);
    } catch (error) {
      next(error);
    }
  }

  // 删除分配记录
  static async deleteAssignment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const assignmentId = req.params.id;
      const assignmentRepository = AppDataSource.getRepository(Assignment);

      const assignment = await assignmentRepository.findOne({ where: { id: assignmentId } });
      if (!assignment) {
        res.status(404).json({ message: '分配记录未找到' });
        return;
      }

      await assignmentRepository.remove(assignment);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}