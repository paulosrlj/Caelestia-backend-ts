import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateAchievementController from '../controllers/achievement/CreateAchievementController';
import CreatePlayerAchievementController from '../controllers/achievement/CreatePlayerAchievementController';
import EquipAchievement from '../controllers/achievement/EquipAchievementController';
import LevelUpAchievementController from '../controllers/achievement/LevelUpAchievementController';
import AchievementRepository from '../repositories/Achievement/AchievementRepository';
import ModuleRepository from '../repositories/Module/ModuleRepository';
import CreateAchievementService from '../services/achievement/CreateAchievementService';
import CreatePlayerAchievementService from '../services/achievement/CreatePlayerAchievementService';
import EquipAchievementService from '../services/achievement/EquipAchievementService';
import LevelUpAchievementService from '../services/achievement/LevelUpAchievementService';

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

// create player-achievement
const createPlayerAchievementService = new CreatePlayerAchievementService(
  achievementRepository,
);
const createPlayerAchievementController = new CreatePlayerAchievementController(
  createPlayerAchievementService,
);

// equip achievement
const equipAchievement = new EquipAchievementService(achievementRepository);
const equipAchievementController = new EquipAchievement(equipAchievement);

// levelup achievement
const levelUpAc = new LevelUpAchievementService(achievementRepository);
const levelUpController = new LevelUpAchievementController(levelUpAc);

router.post('/', achievementController.handle.bind(achievementController));
router.post(
  '/player-achievements',
  createPlayerAchievementController.handle.bind(
    createPlayerAchievementController,
  ),
);
router.post(
  '/equip-achievement',
  equipAchievementController.handle.bind(equipAchievementController),
);

router.post(
  '/levelup-achievement',
  levelUpController.handle.bind(levelUpController),
);

export default router;
