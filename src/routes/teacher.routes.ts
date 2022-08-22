import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateTeacherController from '../controllers/teacher/CreateTeacherController';
import TeacherRepository from '../repositories/Teacher/TeacherRepository';
import CreateTeacherService from '../services/Teacher/CreateTeacherService';

require('express-async-errors');

const router = Router();

const teacherRepository = new TeacherRepository(prisma);

// Create
const createService = new CreateTeacherService(teacherRepository);
const createController = new CreateTeacherController(createService);

router.post('/', createController.handle.bind(createController));

export default router;
