// src/entities/Meeting.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Person } from './Person';
import { MeetingRoom } from './MeetingRoom';

@Entity()
export class Meeting {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startTime: Date;

    @Column({ type: 'timestamp', nullable: true })
    endTime: Date;

    @ManyToMany(() => Person, person => person.meetings)
    @JoinTable()
    participants!: Person[];

    @ManyToMany(() => MeetingRoom, room => room.meetings)
    @JoinTable()
    rooms!: MeetingRoom[];

    constructor(title: string, description: string, startTime: Date, endTime: Date) {
        this.title = title;
        this.description = description;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}