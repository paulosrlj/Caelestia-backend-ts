import { PlayerRanking } from '@prisma/client';

export interface GetAllPlayersOfRankingModel {
  playerEmail: string;
}

export interface IGetAllPlayersOfRanking {
  GetAllPlayersOfRank(
    getAllPlayersOfRank: GetAllPlayersOfRankingModel,
  ): Promise<PlayerRanking[]>;
}
