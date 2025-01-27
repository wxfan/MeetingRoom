import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Seat } from './Seat';
import { Person } from './Person';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assignedAt: Date; // 分配时间

  @Column({ type: 'enum', enum: ['auto', 'manual'], default: 'auto' })
  assignmentType: 'auto' | 'manual'; // 分配类型

  @Column({ type: 'enum', enum: ['active', 'expired'], default: 'active' })
  status: 'active' | 'expired'; // 分配状态

  @Column({ nullable: true })
  note: string; // 分配备注

  @ManyToOne(() => Seat, seat => seat.assignments)
  seat: Seat;

  @ManyToOne(() => Person, person => person.assignments)
  person: Person;

  // add constructor
  constructor(seat: Seat, person: Person, assignmentType: 'auto' | 'manual', note: string) {
    this.seat = seat;
    this.person = person;
    this.assignmentType = assignmentType;
    this.note = note;
    this.status = 'active';
    this.assignedAt = new Date();
  }

}