import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SeatRule {
  @PrimaryGeneratedColumn()
  id: number=0;

  @Column()
  department: string='';

  @Column()
  positionLevel: number=0;

  @Column({ type: 'enum', enum: ['standard', 'vip', 'wheelchair'] })
  seatType: string='standard';

  @Column()
  zoneName: string='';
}