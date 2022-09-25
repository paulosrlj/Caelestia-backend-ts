import { Router } from 'express';
import prisma from '../config/prismaClient';
import AssignRankingController from '../controllers/ranking/AssignRankingController';
import CreateRankingController from '../controllers/ranking/CreateRankingController';
import GetAllPlayersRank from '../controllers/ranking/GetAllPlayersRank';
import RankingRepository from '../repositories/Ranking/RankingRepository';
import AssignRankingService from '../services/Ranking/AssignRankingService';
import CreateRankingService from '../services/Ranking/CreateRankingService';
import GetAllPlayersOfRank from '../services/Ranking/GetAllPlayersOfRank';

require('express-async-errors');

const router = Router();

const rankingRepository = new RankingRepository(prisma);

// Create
const rankingService = new CreateRankingService(rankingRepository);
const rankingController = new CreateRankingController(rankingService);

// assign ranking
const assignService = new AssignRankingService(rankingRepository);
const assignController = new AssignRankingController(assignService);

// getall players of rank
const getAllPlayersService = new GetAllPlayersOfRank(rankingRepository);
const getAllPlayersContr = new GetAllPlayersRank(getAllPlayersService);

router.post('/', rankingController.handle.bind(rankingController));
router.post('/assignRanking', assignController.handle.bind(assignController));

router.get(
  '/playersRanking/:email',
  getAllPlayersContr.handle.bind(getAllPlayersContr),
);

export default router;
