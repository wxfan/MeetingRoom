// src/controllers/MeetingController.ts
import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Meeting } from '../entities/Meeting';
import { Person } from '../entities/Person';
import { MeetingRoom } from '../entities/MeetingRoom';

export class MeetingController {
    static async createMeeting(req: Request, res: Response) {
        const { title, description, startTime, endTime, participantIds, roomIds } = req.body;
        const meetingRepository = AppDataSource.getRepository(Meeting);
        const meeting = new Meeting(title, description, new Date(startTime), new Date(endTime));

        // Fetch participants and rooms from the database
        const personRepository = AppDataSource.getRepository(Person);
        const roomRepository = AppDataSource.getRepository(MeetingRoom);

        meeting.participants = await personRepository.findByIds(participantIds);
        meeting.rooms = await roomRepository.findByIds(roomIds);

        await meetingRepository.save(meeting);
        res.status(201).json(meeting);
    }

    static async getAllMeetings(_req: Request, res: Response) {
        const meetingRepository = AppDataSource.getRepository(Meeting);
        const meetings = await meetingRepository.find({ relations: ['participants', 'rooms'] });
        res.json(meetings);
    }
}