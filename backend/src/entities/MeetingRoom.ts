import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// 会议室模型
interface Room {
  id: string;
  name: string;
  layout: SeatLayout[];
}

// 座位数据结构
interface SeatLayout {
  seatId: string;
  type: 'standard' | 'vip' | 'wheelchair';
  coordinates: { x: number; y: number };
  rotation?: number;
  capacity?: number;
}

@Entity()
export class MeetingRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('json')
  metadata: Room;

  constructor() {
    this.id = ''; 
    this.name = ''; // 初始化 name
    this.metadata = {
      id: '', // 初始化 id
      name: '', // 初始化 name
      layout: [], // 初始化 layout
    }; // 初始化 metadata
  }
}