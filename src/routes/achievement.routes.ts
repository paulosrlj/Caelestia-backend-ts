import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateAchievementController from '../controllers/achievement/CreateAchievementController';
import CreatePlayerAchievementController from '../controllers/achievement/CreatePlayerAchievementController';
import AchievementRepository from '../repositories/Achievement/AchievementRepository';
import ModuleRepository from '../repositories/Module/ModuleRepository';
import CreateAchievementService from '../services/achievement/CreateAchievementService';
import CreatePlayerAchievementService from '../services/achievement/CreatePlayerAchievementService';
import FindAchievementById from '../services/achievement/FindAchievementById';

require('express-async-errors');

const router = Router();

const achievementRepository = new AchievementRepository(prisma);
const moduleRepository = new ModuleRepository(prisma);

// create
const achievementService = new CreateAchievementService(
  achievementRepository,
  moduleRepository,
);
const achievementController = new CreateAchievementController(
  achievementService,
);

// findById
const findByIdService = new FindAchievementById(achievementRepository);

// create player-achievement
const createPlayerAchievementService = new CreatePlayerAchievementService(
  achievementRepository,
  findByIdService,
);
const createPlayerAchievementController = new CreatePlayerAchievementController(
  createPlayerAchievementService,
);

router.post('/', achievementController.handle.bind(achievementController));
router.post(
  '/player-achievements',
  createPlayerAchievementController.handle.bind(
    createPlayerAchievementController,
  ),
);

export default router;
