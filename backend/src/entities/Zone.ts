import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { MeetingRoom } from './MeetingRoom';
import { Seat } from './Seat';

@Entity()
export class Zone {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['vvip', 'vip', 'normal'] })
  category: 'vvip' | 'vip' | 'normal' ;

  @Column({ default: 0 })
  capacity: number; // 区域容量

  @ManyToOne(() => MeetingRoom, room => room.zones)
    room!: MeetingRoom;

  @OneToMany(() => Seat, seat => seat.zone)
  seats!: Seat[];

  // add constructor
  constructor() {
    this.name = "";
    this.category = "normal";
    this.capacity = 0;
  }

}