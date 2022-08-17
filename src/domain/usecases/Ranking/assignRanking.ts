import { Ranking } from '@prisma/client';

export interface AssignRankingModel {
  playerId: string;
  rankingIndividualId: number;
}

export interface IAssignRanking {
  assignRanking(assignRankingModel: AssignRankingModel): Promise<Ranking>;
}
