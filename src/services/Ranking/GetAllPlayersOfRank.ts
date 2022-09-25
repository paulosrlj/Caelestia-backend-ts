import { PlayerRanking } from '@prisma/client';
import {
  GetAllPlayersOfRankingModel,
  IGetAllPlayersOfRanking,
} from '../../domain/usecases/Ranking/getAllPlayersOfRanking';
import { IGetAllPlayersOfRank as IGetAllPlayersRepo } from '../../repositories/Ranking/interfaces/IGetAllPlayersOfRank';

class GetAllPlayersOfRank implements IGetAllPlayersOfRanking {
  private getAllPlayers;

  constructor(getAllPlayers: IGetAllPlayersRepo) {
    this.getAllPlayers = getAllPlayers;
  }

  async GetAllPlayersOfRank(
    getAllPlayersOfRank: GetAllPlayersOfRankingModel,
  ): Promise<PlayerRanking[]> {
    return this.getAllPlayers.getAllPlayersOfRank(getAllPlayersOfRank);
  }
}

export default GetAllPlayersOfRank;
