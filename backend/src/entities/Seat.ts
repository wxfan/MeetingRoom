import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Zone } from './Zone';
import { Assignment } from './Assignment';
import { SeatMaintenance } from './SeatMaintenance';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: ['available', 'unavailable', 'reserved', 'temporary'],
    default: 'available',
  })
  status: 'available' | 'unavailable' | 'reserved' | 'temporary';

  @ManyToOne(() => Zone, zone => zone.seats)
  zone: Zone;

  @OneToMany(() => Assignment, assignment => assignment.seat)
  assignments!: Assignment[];

  @OneToMany(() => SeatMaintenance, maintenance => maintenance.seat)
  maintenances!: SeatMaintenance[];

  constructor(
    code: string,
    status: 'available' | 'unavailable' | 'reserved' | 'temporary' = 'available',
    zone: Zone
  ) {
    // set the default value for the id colume, which is auto-generated
    this.code = code;
    this.status = status;
    this.zone = zone;
  }
}
