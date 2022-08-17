import { Router } from 'express';
import prisma from '../config/prismaClient';
import AssignRankingController from '../controllers/ranking/AssignRankingController';
import CreateRankingController from '../controllers/ranking/CreateRankingController';
import RankingRepository from '../repositories/Ranking/RankingRepository';
import AssignRankingService from '../services/Ranking/AssignRankingService';
import CreateRankingService from '../services/Ranking/CreateRankingService';

require('express-async-errors');

const router = Router();

const rankingRepository = new RankingRepository(prisma);

// Create
const rankingService = new CreateRankingService(rankingRepository);
const rankingController = new CreateRankingController(rankingService);

// assign ranking
const assignService = new AssignRankingService(rankingRepository);
const assignController = new AssignRankingController(assignService);

router.post('/', rankingController.handle.bind(rankingController));
router.post('/assignRanking', assignController.handle.bind(assignController));

export default router;
