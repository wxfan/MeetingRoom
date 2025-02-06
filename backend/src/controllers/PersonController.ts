import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Person } from '../entities/Person';
import { Department } from '../entities/Department'; // Import Department entity
import { JobTitle } from '../entities/JobTitle'; // Import JobTitle entity

export class PersonController {
  // Get all persons
  static async getAllPersons(_req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personRepository = AppDataSource.getRepository(Person);
      const persons = await personRepository.find({
        relations: ['department', 'jobTitle'], // Include relations
      });
      res.status(200).json(persons);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // Get a person by ID
  static async getPersonById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = req.params.id;
      const personRepository = AppDataSource.getRepository(Person);
      const person = await personRepository.findOne({
        where: { id: personId },
        relations: ['department', 'jobTitle'], // Include relations
      });

      if (!person) {
        res.status(404).json({ message: '人员未找到' });
        return;
      }

      res.status(200).json(person);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // Create a new person
  static async createPerson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { account, name, departmentId, jobTitleId, contact } = req.body;

      // Fetch department and job title entities
      const departmentRepository = AppDataSource.getRepository(Department);
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);

      const department = await departmentRepository.findOne({ where: { id: departmentId } });
      const jobTitle = await jobTitleRepository.findOne({ where: { id: jobTitleId } });

      if (!department || !jobTitle) {
        res.status(404).json({ message: '部门或职位未找到' });
        return;
      }

      // Create the new person
      const personRepository = AppDataSource.getRepository(Person);
      const newPerson = personRepository.create({
        account,
        name,
        department,
        jobTitle,
        contact,
      });

      await personRepository.save(newPerson);
      res.status(201).json(newPerson);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // Update a person
  static async updatePerson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = req.params.id;
      const { account, name, departmentId, jobTitleId, contact } = req.body;

      // Fetch department and job title entities
      const departmentRepository = AppDataSource.getRepository(Department);
      const jobTitleRepository = AppDataSource.getRepository(JobTitle);

      const department = await departmentRepository.findOne({ where: { id: departmentId } });
      const jobTitle = await jobTitleRepository.findOne({ where: { id: jobTitleId } });

      if (!department || !jobTitle) {
        res.status(404).json({ message: '部门或职位未找到' });
        return;
      }

      // Fetch the person to update
      const personRepository = AppDataSource.getRepository(Person);
      const person = await personRepository.findOne({ where: { id: personId } });

      if (!person) {
        res.status(404).json({ message: '人员未找到' });
        return;
      }

      // Update the person
      person.account = account;
      person.name = name;
      person.department = department;
      person.jobTitle = jobTitle;
      person.contact = contact;

      await personRepository.save(person);
      res.status(200).json(person);
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }

  // Delete a person
  static async deletePerson(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const personId = req.params.id;
      const personRepository = AppDataSource.getRepository(Person);

      const person = await personRepository.findOne({ where: { id: personId } });
      if (!person) {
        res.status(404).json({ message: '人员未找到' });
        return;
      }

      await personRepository.remove(person);
      res.status(204).send();
    } catch (error) {
      next(error); // Pass the error to the Express error-handling middleware
    }
  }
}