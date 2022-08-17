import { Router } from 'express';
import prisma from '../config/prismaClient';
import CreateRankingController from '../controllers/ranking/CreateRankingController';
import RankingRepository from '../repositories/Ranking/RankingRepository';
import CreateRankingService from '../services/Ranking/CreateRankingService';

require('express-async-errors');

const router = Router();

const rankingRepository = new RankingRepository(prisma);

// Create
const rankingService = new CreateRankingService(rankingRepository);
const rankingController = new CreateRankingController(rankingService);

router.post('/', rankingController.handle.bind(rankingController));

export default router;
