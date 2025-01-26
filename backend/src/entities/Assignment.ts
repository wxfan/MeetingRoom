import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MeetingRoom } from './MeetingRoom';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @ManyToOne(() => MeetingRoom)
  meetingRoom: MeetingRoom;

  @Column()
  seatNumber: string;

  @Column()
  assignmentDate: Date;

  @Column()
  department: string;

  @Column()
  positionLevel: number;
}
