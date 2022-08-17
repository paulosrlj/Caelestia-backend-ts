import { PlayerRanking } from '@prisma/client';
import { AssignRankingModel } from '../../../domain/usecases/Ranking/assignRanking';

export interface IAssignRanking {
  assignRanking(assignRankingModel: AssignRankingModel): Promise<PlayerRanking>;
}
