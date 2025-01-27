import express from 'express';
import { RoomController } from '../controllers/RoomController';

const router = express.Router();

// 获取所有会议室
router.get('/', RoomController.getAllRooms);

// 获取单个会议室详情
router.get('/:id', RoomController.getRoomById);

// 创建新会议室
router.post('', RoomController.createRoom);

// 更新会议室信息
router.put('/:id', RoomController.updateRoom);

// 删除会议室
router.delete('/:id', RoomController.deleteRoom);

export default router;