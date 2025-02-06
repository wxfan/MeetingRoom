import express from 'express';
import { SeatMaintenanceController } from '../controllers/SeatMaintenanceController';

const router = express.Router();

// 获取所有维护记录
router.get('/', SeatMaintenanceController.getAllMaintenances);

// 获取单个维护记录详情
router.get('/:id', SeatMaintenanceController.getMaintenanceById);

// 创建新维护记录
router.post('/', SeatMaintenanceController.createMaintenance);

// 更新维护记录信息
router.put('/:id', SeatMaintenanceController.updateMaintenance);

// 删除维护记录
router.delete('/:id', SeatMaintenanceController.deleteMaintenance);

export default router;