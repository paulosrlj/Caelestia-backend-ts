import { PlayerRanking } from '@prisma/client';
import {
  AssignRankingModel,
  IAssignRanking,
} from '../../domain/usecases/Ranking/assignRanking';
import { IAssignRanking as IAssignRankingRepo } from '../../repositories/Ranking/interfaces/IAssignRanking';

class AssignRankingService implements IAssignRanking {
  private assignRankingRepo;

  constructor(assignRankingRepo: IAssignRankingRepo) {
    this.assignRankingRepo = assignRankingRepo;
  }

  async assignRanking(
    assignRankingModel: AssignRankingModel,
  ): Promise<PlayerRanking> {
    return this.assignRankingRepo.assignRanking(assignRankingModel);
  }
}

export default AssignRankingService;
