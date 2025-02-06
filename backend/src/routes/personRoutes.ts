import express from 'express';
import { PersonController } from '../controllers/PersonController';

const router = express.Router();

// 获取所有人员
router.get('/', PersonController.getAllPersons);

// 获取单个人员详情
router.get('/:id', PersonController.getPersonById);

// 创建新人员
router.post('/', PersonController.createPerson);

// 更新人员信息
router.put('/:id', PersonController.updatePerson);

// 删除人员
router.delete('/:id', PersonController.deletePerson);

export default router;