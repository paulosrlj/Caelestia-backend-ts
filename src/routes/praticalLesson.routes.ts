import { Router } from 'express';
import prisma from '../config/prismaClient';

import PraticalLessonRepository from '../repositories/PraticalLesson/PraticalLessonRepository';
import CreatePraticalLessonController from '../controllers/praticalLesson/CreatePraticalLessonController';
import DeletePraticalLessonController from '../controllers/praticalLesson/DeletePraticalLessonController';
import UpdatePraticalLessonController from '../controllers/praticalLesson/UpdatePraticalLessonController';
import CreatePraticalLessonService from '../services/praticalLesson/CreatePraticalLessonService';
import DeletePraticalLessonService from '../services/praticalLesson/DeletePraticalLessonService';
import UpdatePraticalLessonService from '../services/praticalLesson/UpdatePraticalLessonService';
import CompletePraticalLessonService from '../services/praticalLesson/CompletePraticalLessonService';
import CompletePraticalLessonController from '../controllers/praticalLesson/CompletePraticalLessonController';

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

// complete PL
const completePlService = new CompletePraticalLessonService(repository);
const completePlController = new CompletePraticalLessonController(
  completePlService,
);

router.post('/', createController.handle.bind(createController));
router.put('/:id', updateController.handle.bind(updateController));
router.delete('/:id', deleteController.handle.bind(deleteController));
router.post(
  '/completePl',
  completePlController.handle.bind(completePlController),
);

export default router;
