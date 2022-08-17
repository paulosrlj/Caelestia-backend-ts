import { Ranking } from '@prisma/client';

export interface CreateRankingModel {
  rankingName: string;
  urlRankingBadge: string;
  pointsToPromotion: number;
}

export interface ICreateRanking {
  create(createRankingModel: CreateRankingModel): Promise<Ranking>;
}
