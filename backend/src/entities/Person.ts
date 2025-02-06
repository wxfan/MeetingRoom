// src/entities/Person.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Assignment } from './Assignment';
import { Meeting } from './Meeting';
import { Department } from './Department';
import { JobTitle } from './JobTitle';

@Entity()
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    name: string;

    @Column()
    account: string;

    @Column()
    contact: string;

    @Column()
    department!: Department;

    @Column()
    jobTitle!: JobTitle;

    @OneToMany(() => Assignment, assignment => assignment.person)
    assignments!: Assignment[];

    @ManyToMany(() => Meeting, meeting => meeting.participants)
    meetings!: Meeting[];

    constructor(name: string = "", account: string = "", contact: string = "") {
        this.name = name;
        this.account = account;
        this.contact=contact;
    }
}