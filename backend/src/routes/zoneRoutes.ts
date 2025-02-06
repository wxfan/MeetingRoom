import express from 'express';
import { ZoneController } from '../controllers/ZoneController';

const router = express.Router();

// 获取所有区域
router.get('/', ZoneController.getAllZones);

// 获取单个区域详情
router.get('/:id', ZoneController.getZoneById);

// 创建新区域
router.post('', ZoneController.createZone);

// 更新区域信息
router.put('/:id', ZoneController.updateZone);

// 删除区域
router.delete('/:id', ZoneController.deleteZone);

export default router;