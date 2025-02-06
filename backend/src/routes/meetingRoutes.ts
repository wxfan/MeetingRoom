// src/routes/meetingRoutes.ts
import express from 'express';
import { MeetingController } from '../controllers/MeetingController';

const router = express.Router();

router.post('/', MeetingController.createMeeting);
router.get('/', MeetingController.getAllMeetings);

export default router;