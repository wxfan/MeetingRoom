import express from 'express';
import { SeatController } from '../controllers/SeatController';

const router = express.Router();

// 获取所有座位
router.get('/', SeatController.getAllSeats);

// 获取单个座位详情
router.get('/:id', SeatController.getSeatById);

// 创建新座位
router.post('', SeatController.createSeat);

// 更新座位信息
router.put('/:id', SeatController.updateSeat);

// 删除座位
router.delete('/:id', SeatController.deleteSeat);

// 分配座位
router.post('/assign', SeatController.assignSeats);

export default router;