import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateTeacherController from '../controllers/teacher/CreateTeacherController';
import LoginTeacherController from '../controllers/teacher/LoginTeacherController';
import TeacherRepository from '../repositories/Teacher/TeacherRepository';
import CreateTeacherService from '../services/Teacher/CreateTeacherService';
import LoginTeacherService from '../services/Teacher/LoginTeacherService';

require('express-async-errors');

const router = Router();

const teacherRepository = new TeacherRepository(prisma);

// Create
const createService = new CreateTeacherService(teacherRepository);
const createController = new CreateTeacherController(createService);

// login
const loginService = new LoginTeacherService(teacherRepository);
const loginController = new LoginTeacherController(loginService);

router.post('/', createController.handle.bind(createController));
router.post('/login', loginController.handle.bind(loginController));

export default router;
