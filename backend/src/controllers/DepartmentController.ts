import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source'; // Import the data source
import { Department } from '../entities/Department';

export class DepartmentController {
  // GET all departments
  static async getAllDepartments(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departmentRepository = AppDataSource.getRepository(Department);
      const departments = await departmentRepository.find();
      res.status(200).json(departments);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // GET department by ID
  static async getDepartmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departmentRepository = AppDataSource.getRepository(Department);
      const department = await departmentRepository.findOne({ where: { id: req.params.id } });
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      res.status(200).json(department);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // POST create a new department
  static async createDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departmentRepository = AppDataSource.getRepository(Department);
      const newDepartment = departmentRepository.create(req.body);
      await departmentRepository.save(newDepartment);
      res.status(201).json(newDepartment);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // PUT update a department
  static async updateDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departmentRepository = AppDataSource.getRepository(Department);
      const department = await departmentRepository.findOne({ where: { id: req.params.id } });
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      departmentRepository.merge(department, req.body);
      const updatedDepartment = await departmentRepository.save(department);
      res.status(200).json(updatedDepartment);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // DELETE a department
  static async deleteDepartment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const departmentRepository = AppDataSource.getRepository(Department);
      const department = await departmentRepository.findOne({ where: { id: req.params.id } });
      if (!department) {
        res.status(404).json({ message: 'Department not found' });
        return;
      }
      await departmentRepository.remove(department);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }
}