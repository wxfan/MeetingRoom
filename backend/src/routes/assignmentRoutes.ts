import express from 'express';
import { AssignmentController } from '../controllers/AssignmentController';

const router = express.Router();

// 获取所有分配
router.get('/', AssignmentController.getAllAssignments);

// 获取单个分配详情
router.get('/:id', AssignmentController.getAssignmentById);

// 创建新分配
router.post('/', AssignmentController.createAssignment);

// 更新分配信息
router.put('/:id', AssignmentController.updateAssignment);

// 删除分配
router.delete('/:id', AssignmentController.deleteAssignment);

export default router;