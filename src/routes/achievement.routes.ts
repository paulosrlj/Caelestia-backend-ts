import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateAchievementController from '../controllers/achievement/CreateAchievementController';
import AchievementRepository from '../repositories/Achievement/AchievementRepository';
import CreateAchievementService from '../services/achievement/CreateAchievementService';

require('express-async-errors');

const router = Router();

const achievementRepository = new AchievementRepository(prisma);

// create
const achievementService = new CreateAchievementService(achievementRepository);
const achievementController = new CreateAchievementController(
  achievementService,
);

router.post('/', achievementController.handle.bind(achievementController));

export default router;
