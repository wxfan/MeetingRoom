import express from 'express';
import { JobTitleController } from '../controllers/JobTitleController';

const router = express.Router();

// Get all job titles
router.get('/', JobTitleController.getAllJobTitles);

// Get job title by ID
router.get('/:id', JobTitleController.getJobTitleById);

// Create a new job title
router.post('/', JobTitleController.createJobTitle);

// Update a job title
router.put('/:id', JobTitleController.updateJobTitle);

// Delete a job title
router.delete('/:id', JobTitleController.deleteJobTitle);

export default router;