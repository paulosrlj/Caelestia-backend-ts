import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateTheoricLessonController from '../controllers/theoricLesson/CreateTheoricLessonController';
import DeleteTheoricLessonController from '../controllers/theoricLesson/DeleteTheoricLessonController';
import UpdateTheoricLessonController from '../controllers/theoricLesson/UpdateTheoricLessonController';
import TheoricLessonRepository from '../repositories/TheoricLesson/TheoricLessonRepository';
import CreateTheoricLessonService from '../services/theoricLesson/CreateTheoricLessonService';
import DeleteTheoricLesson from '../services/theoricLesson/DeleteTheoricLessonService';
import UpdateTheoricLesson from '../services/theoricLesson/UpdateTheoricLessonService';

require('express-async-errors');

const router = Router();

const theoricLessonRepository = new TheoricLessonRepository(prisma);

// Create
const createService = new CreateTheoricLessonService(theoricLessonRepository);
const createController = new CreateTheoricLessonController(createService);

// Update
const updateService = new UpdateTheoricLesson(theoricLessonRepository);
const updateController = new UpdateTheoricLessonController(updateService);

// Delete
const deleteService = new DeleteTheoricLesson(theoricLessonRepository);
const deleteController = new DeleteTheoricLessonController(deleteService);

router.post('/', createController.handle.bind(createController));
router.put('/:id', updateController.handle.bind(updateController));
router.delete('/:id', deleteController.handle.bind(deleteController));

export default router;
