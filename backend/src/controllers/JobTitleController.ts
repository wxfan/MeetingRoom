import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source'; // Import the data source
import { JobTitle } from '../entities/JobTitle';

export class JobTitleController {
  // GET all job titles
  static async getAllJobTitles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);
      const jobTitles = await jobTitleRepository.find({ relations: ['people'] });
      res.status(200).json(jobTitles);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // GET job title by ID
  static async getJobTitleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);
      const jobTitle = await jobTitleRepository.findOne({
        where: { id: req.params.id },
        relations: ['people'],
      });

      if (!jobTitle) {
        res.status(404).json({ message: 'Job title not found' });
        return;
      }

      res.status(200).json(jobTitle);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // POST create a new job title
  static async createJobTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);
      const { title } = req.body;
      const newJobTitle = jobTitleRepository.create({ title });
      await jobTitleRepository.save(newJobTitle);
      res.status(201).json(newJobTitle);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // PUT update a job title
  static async updateJobTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);
      const { title } = req.body;
      const jobTitle = await jobTitleRepository.findOne({ where: { id: req.params.id } });

      if (!jobTitle) {
        res.status(404).json({ message: 'Job title not found' });
        return;
      }

      jobTitle.title = title;
      await jobTitleRepository.save(jobTitle);
      res.status(200).json(jobTitle);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // DELETE a job title
  static async deleteJobTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);
      const jobTitle = await jobTitleRepository.findOne({ where: { id: req.params.id } });

      if (!jobTitle) {
        res.status(404).json({ message: 'Job title not found' });
        return;
      }

      await jobTitleRepository.remove(jobTitle);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }
}