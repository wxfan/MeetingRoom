import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { MeetingRoom } from './MeetingRoom';

@Entity()
export class SeatRule {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column()
  department: string = '';

  @Column()
  positionLevel: number = 0;

  @Column({ type: 'enum', enum: ['standard', 'vip', 'wheelchair'] })
  seatType: string = 'standard';

  @Column()
  zoneName: string = '';

  // Add meeting room relation
  @ManyToOne(() => MeetingRoom)
  @JoinColumn()
  meetingRoom: MeetingRoom;
}
