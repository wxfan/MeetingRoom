// src/data-source.ts
import { DataSource } from 'typeorm';
import { Assignment } from './entities/Assignment';
import { MeetingRoom } from './entities/MeetingRoom';
import { Person } from './entities/Person';
import { Seat } from './entities/Seat';
import { SeatMaintenance } from './entities/SeatMaintenance';
import { Zone } from './entities/Zone';
import { Meeting } from './entities/Meeting';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'meeting_room_user',
  password: 'Password01!',
  database: 'meeting_room_db',
  synchronize: false,
  logging: false,
  entities: [Assignment, MeetingRoom, Person, Seat, SeatMaintenance, Zone, Meeting],
  migrations: [], // 迁移文件
  subscribers: [], // 订阅者
});