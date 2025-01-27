import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MeetingRoom } from './MeetingRoom';
import { Seat } from './Seat';

@Entity()
export class Zone {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['department', 'position'] })
  category: 'department' | 'position';

  @Column({ default: 0 })
  capacity: number; // 区域容量

  @ManyToOne(() => MeetingRoom, room => room.zones)
    room!: MeetingRoom;

  @OneToMany(() => Seat, seat => seat.zone)
  seats!: Seat[];

  // add constructor
  constructor() {
    this.name = "";
    this.category = "department";
    this.capacity = 0;
  }

}