import { Router } from 'express';
import prisma from '../config/prismaClient';

import PraticalLessonRepository from '../repositories/PraticalLesson/PraticalLessonRepository';
import CreatePraticalLessonController from '../controllers/praticalLesson/CreatePraticalLessonController';
import DeletePraticalLessonController from '../controllers/praticalLesson/DeletePraticalLessonController';
import UpdatePraticalLessonController from '../controllers/praticalLesson/UpdatePraticalLessonController';
import CreatePraticalLessonService from '../services/praticalLesson/CreatePraticalLessonService';
import DeletePraticalLessonService from '../services/praticalLesson/DeletePraticalLessonService';
import UpdatePraticalLessonService from '../services/praticalLesson/UpdatePraticalLessonService';

require('express-async-errors');

const router = Router();

const repository = new PraticalLessonRepository(prisma);

// Create
const createService = new CreatePraticalLessonService(repository);
const createController = new CreatePraticalLessonController(createService);

// Update
const updateService = new UpdatePraticalLessonService(repository);
const updateController = new UpdatePraticalLessonController(updateService);

// Delete
const deleteService = new DeletePraticalLessonService(repository);
const deleteController = new DeletePraticalLessonController(deleteService);

router.post('/', createController.handle.bind(createController));
router.put('/:id', updateController.handle.bind(updateController));
router.delete('/:id', deleteController.handle.bind(deleteController));

export default router;
