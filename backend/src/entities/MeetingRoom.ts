import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Zone } from './Zone';

@Entity()
export class MeetingRoom {
    @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name: string;

  @OneToMany(() => Zone, zone => zone.room)
  zones!: Zone[];

  // add constructor 
  constructor() {
    this.id = "";
    this.name = "";
  }

}