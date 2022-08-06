import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreatePlayerController from '../controllers/player/CreatePlayerController';
import DeactivatePlayerController from '../controllers/player/DeactivatePlayerController';
import FindByEmailPlayerController from '../controllers/player/FindByEmailPlayerController';
import PlayerRepository from '../repositories/Player/PlayerRepository';
import CreatePlayerService from '../services/player/CreatePlayerService';
import DeactivatePlayerService from '../services/player/DeactivatePlayerService';
import FindByEmailPlayerService from '../services/player/FindByEmailPlayerService';

require('express-async-errors');

const router = Router();

const playerRepository = new PlayerRepository(prisma);

// Create
const createService = new CreatePlayerService(playerRepository);
const createController = new CreatePlayerController(createService);

// Find
const findByEmailService = new FindByEmailPlayerService(playerRepository);
const findByEmailController = new FindByEmailPlayerController(
  findByEmailService,
);

// Deactivate
const deactivateService = new DeactivatePlayerService(playerRepository);
const deactivateController = new DeactivatePlayerController(deactivateService);

router.post('/', createController.handle.bind(createController));
router.get(
  '/email/:email',
  findByEmailController.handle.bind(findByEmailController),
);
router.delete(
  '/deactivate/',
  deactivateController.handle.bind(deactivateController),
);

export default router;
