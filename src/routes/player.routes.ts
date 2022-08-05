import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreatePlayerController from '../controllers/player/CreatePlayerController';
import FindByEmailPlayerController from '../controllers/player/FindByEmailPlayerController';
import PlayerRepository from '../repositories/Player/PlayerRepository';
import CreatePlayerService from '../services/player/CreatePlayerService';
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

router.post('/', createController.handle.bind(createController));
router.get(
  '/email/:email',
  findByEmailController.handle.bind(findByEmailController),
);

export default router;
