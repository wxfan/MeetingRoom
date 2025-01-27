import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Assignment } from './Assignment';

@Entity()
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

  @Column({ unique: true })
  account: string; // 账号

  @Column()
  name: string; // 姓名

  @Column()
  department: string; // 部门

  @Column()
  position: string; // 岗位

  @Column()
  contact: string; // 联系方式

  @OneToMany(() => Assignment, assignment => assignment.person)
  assignments!: Assignment[];

  // add constructor
  constructor(account: string, name: string, department: string, position: string, contact: string) {
    this.account = account;
    this.name = name;
    this.department = department;
    this.position = position;
    this.contact = contact;
  } 

}