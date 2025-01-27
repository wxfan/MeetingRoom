import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Seat } from './Seat';

@Entity()
export class SeatMaintenance {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ type: 'timestamp' })
  startTime: Date; // 维护开始时间

  @Column({ type: 'timestamp' })
  endTime: Date; // 维护结束时间

  @Column()
  reason: string; // 维护原因

  @Column()
  reporter: string; // 报告人

  @ManyToOne(() => Seat, seat => seat.maintenances)
  seat: Seat;

  // create constructor method
  constructor(seat: Seat, startTime: Date, endTime: Date, reason: string, reporter: string) {
    this.seat = seat;
    this.startTime = startTime;
    this.endTime = endTime;
    this.reason = reason;
    this.reporter = reporter;
  }

}