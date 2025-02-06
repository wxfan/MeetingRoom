import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Person } from './Person';

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  name: string; // 部门名称

  @Column({ nullable: true })
  code: string; // 部门代码

  @Column({ nullable: true })
  category: string; // 分类

  @Column({ type: 'integer', default: 0 })
  sortOrder: number; // 排序

  @OneToMany(() => Person, person => person.department)
  people!: Person[];

  constructor(name: string, code?: string, category?: string, sortOrder: number = 0) {
    this.name = name;
    this.code = code || '';
    this.category = category || '';
    this.sortOrder = sortOrder;
  }
}