import { Ranking } from '@prisma/client';
import {
  CreateRankingModel,
  ICreateRanking,
} from '../../domain/usecases/Ranking/create-ranking';
import { ICreateRanking as ICreateRankingRepository } from '../../repositories/Ranking/interfaces/ICreateRanking';

class CreateRankingService implements ICreateRanking {
  private createRanking;

  constructor(createRanking: ICreateRankingRepository) {
    this.createRanking = createRanking;
  }

  async create(createRankingModel: CreateRankingModel): Promise<Ranking> {
    return this.createRanking.create(createRankingModel);
  }
}

export default CreateRankingService;
