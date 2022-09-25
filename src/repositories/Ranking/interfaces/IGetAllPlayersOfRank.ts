import { PlayerRanking } from '@prisma/client';
import { GetAllPlayersOfRankingModel } from '../../../domain/usecases/Ranking/getAllPlayersOfRanking';

export interface IGetAllPlayersOfRank {
  getAllPlayersOfRank(
    getAllPlayers: GetAllPlayersOfRankingModel,
  ): Promise<PlayerRanking[]>;
}
