import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreatePlayerController from '../controllers/player/CreatePlayerController';
import DeactivatePlayerController from '../controllers/player/DeactivatePlayerController';
import FindByEmailPlayerController from '../controllers/player/FindByEmailPlayerController';
import LoginPlayerController from '../controllers/player/LoginPlayerController';
import UpdatePlayerController from '../controllers/player/UpdatePlayerController';
import PlayerRepository from '../repositories/Player/PlayerRepository';
import CreatePlayerService from '../services/player/CreatePlayerService';
import DeactivatePlayerService from '../services/player/DeactivatePlayerService';
import FindByEmailPlayerService from '../services/player/FindByEmailPlayerService';
import LoginPlayerService from '../services/player/LoginPlayerService';
import UpdatePlayerService from '../services/player/UpdatePlayerService';

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

// update
const updateService = new UpdatePlayerService(playerRepository);
const updateController = new UpdatePlayerController(updateService);

// login
const loginService = new LoginPlayerService(playerRepository);
const loginController = new LoginPlayerController(loginService);

router.post('/', createController.handle.bind(createController));
router.get(
  '/email/:email',
  findByEmailController.handle.bind(findByEmailController),
);
router.put('/:email', updateController.handle.bind(updateController));
router.delete(
  '/deactivate/',
  deactivateController.handle.bind(deactivateController),
);
router.post('/login/', loginController.handle.bind(loginController));

export default router;
