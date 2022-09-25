import { Router } from 'express';
import prisma from '../config/prismaClient';
import CompleteTheoricLessonController from '../controllers/theoricLesson/CompleteTheoricLessonController';
import CreateTheoricLessonController from '../controllers/theoricLesson/CreateTheoricLessonController';
import DeleteTheoricLessonController from '../controllers/theoricLesson/DeleteTheoricLessonController';
import GetOneTheoricLessonCotrolller from '../controllers/theoricLesson/GetOneTheoricLessonCotrolller';
import UpdateTheoricLessonController from '../controllers/theoricLesson/UpdateTheoricLessonController';
import TheoricLessonRepository from '../repositories/TheoricLesson/TheoricLessonRepository';
import CompleteTheoricLessonService from '../services/theoricLesson/CompleteTheoricLessonService';
import CreateTheoricLessonService from '../services/theoricLesson/CreateTheoricLessonService';
import DeleteTheoricLesson from '../services/theoricLesson/DeleteTheoricLessonService';
import GetOneTheoricLesson from '../services/theoricLesson/GetOneTheoricLesson';
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

// complete TL
const completeTlService = new CompleteTheoricLessonService(
  theoricLessonRepository,
);
const completeTlController = new CompleteTheoricLessonController(
  completeTlService,
);

// Get one
const getOneService = new GetOneTheoricLesson(theoricLessonRepository);
const getOneController = new GetOneTheoricLessonCotrolller(getOneService);

router.post('/', createController.handle.bind(createController));
router.put('/:id', updateController.handle.bind(updateController));
router.delete('/:id', deleteController.handle.bind(deleteController));
router.post(
  '/completeTl',
  completeTlController.handle.bind(completeTlController),
);
router.get('/:id', getOneController.handle.bind(getOneController));

export default router;
