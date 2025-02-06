// src/entities/MeetingRoom.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Zone } from './Zone';
import { Meeting } from './Meeting';

@Entity()
export class MeetingRoom {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name: string;

    @OneToMany(() => Zone, zone => zone.room)
    zones!: Zone[];

    @ManyToMany(() => Meeting, meeting => meeting.rooms)
    meetings!: Meeting[];

    constructor(name: string = "") {
        this.name = name;
    }
}