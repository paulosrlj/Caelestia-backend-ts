import { Ranking } from '@prisma/client';
import { CreateRankingModel } from '../../../domain/usecases/Ranking/create-ranking';

export interface ICreateRanking {
  create(createRankingModel: CreateRankingModel): Promise<Ranking>;
}
