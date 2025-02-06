import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { SeatMaintenance } from '../entities/SeatMaintenance';
import { Seat } from '../entities/Seat';

export class SeatMaintenanceController {
  // Get all maintenance records
  public static async getAllMaintenances(_req: Request, res: Response) {
    try {
      const seatMaintenanceRepository = AppDataSource.getRepository(SeatMaintenance);
      const maintenances = await seatMaintenanceRepository.find({ relations: ['seat'] });
      res.status(200).json(maintenances);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching maintenance records', error });
    }
  }

  public static async getMaintenanceById(req: Request, res: Response, next: NextFunction): 
  Promise<void> {
    const { id } = req.params;
    try {
      const seatMaintenanceRepository = AppDataSource.getRepository(SeatMaintenance);
      const maintenance = await seatMaintenanceRepository.findOne({
        where: { id },
        relations: ['seat'],
      });
      if (!maintenance) {
        res.status(404).json({ message: 'Maintenance record not found' });
      }
      res.status(200).json(maintenance);
    } catch (error) {
      next(error); 
    }
  }

  public static async createMaintenance(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { seatId, startTime, endTime, reason, reporter } = req.body;
    try {
      const seatRepository = AppDataSource.getRepository(Seat);
      const seat = await seatRepository.findOne({ where: { id: seatId } });
      if (!seat) {
        res.status(404).json({ message: 'Seat not found' });
      }

      const seatMaintenanceRepository = AppDataSource.getRepository(SeatMaintenance);
      if (!seat) {
        res.status(404).json({ message: 'Seat not found' });
        return;
      }

      const newMaintenance = seatMaintenanceRepository.create({
        seat,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        reason,
        reporter,
      });
      await seatMaintenanceRepository.save(newMaintenance);
      res.status(201).json(newMaintenance);
    } catch (error) {
      next(error);
    }
  }

  // Update a maintenance record by ID
  public static async updateMaintenance(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const { seatId, startTime, endTime, reason, reporter } = req.body;
    try {
      const seatMaintenanceRepository = AppDataSource.getRepository(SeatMaintenance);
      const maintenance = await seatMaintenanceRepository.findOne({
        where: { id },
        relations: ['seat'],
      });
      if (!maintenance) {
        res.status(404).json({ message: 'Maintenance record not found' });
        return;
      }

      if (seatId) {
        const seatRepository = AppDataSource.getRepository(Seat);
        const seat = await seatRepository.findOne({ where: { id: seatId } });
        
        if (!seat) {
          res.status(404).json({ message: 'Seat not found' });
          return;
        }        
        maintenance.seat = seat;
      }

      if (startTime) maintenance.startTime = new Date(startTime);
      if (endTime) maintenance.endTime = new Date(endTime);
      if (reason) maintenance.reason = reason;
      if (reporter) maintenance.reporter = reporter;

      await seatMaintenanceRepository.save(maintenance);
      res.status(200).json(maintenance);
    } catch (error) {
      next(error);
    }
  }

  // Delete a maintenance record by ID
  public static async deleteMaintenance(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    try {
      const seatMaintenanceRepository = AppDataSource.getRepository(SeatMaintenance);
      const maintenance = await seatMaintenanceRepository.findOne({ where: { id } });
      if (!maintenance) {
        res.status(404).json({ message: 'Maintenance record not found' });
        return;
      }

      await seatMaintenanceRepository.remove(maintenance);
      res.status(200).json({ message: 'Maintenance record deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}