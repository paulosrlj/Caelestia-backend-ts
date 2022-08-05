import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreatePlayerController from '../controllers/player/CreatePlayerController';
import PlayerRepository from '../repositories/Player/PlayerRepository';
import CreatePlayerService from '../services/player/CreatePlayerService';

require('express-async-errors');

const router = Router();

const playerRepository = new PlayerRepository(prisma);

// Create
const createService = new CreatePlayerService(playerRepository);
const createController = new CreatePlayerController(createService);

router.post('/', createController.handle.bind(createController));

export default router;
