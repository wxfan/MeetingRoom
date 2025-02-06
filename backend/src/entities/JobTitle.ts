import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Person } from './Person';

@Entity()
export class JobTitle {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  title: string; // Job title (e.g., "Engineer", "Manager")

  @Column({ nullable: true }) // 编码字段，允许为空
  code: string;

  @Column({ default: 0 }) // 排序字段，默认值为 0
  sortOrder: number;

  @OneToMany(() => Person, person => person.jobTitle)
  people!: Person[];

  constructor(title: string, code: string, sortOrder?: number) {
    this.title = title;
    this.code = code; // 如果未提供 code，则默认为 null
    this.sortOrder = sortOrder || 0; // 如果未提供 sortOrder，则默认为 0
  }
}