import { Achievement } from '../../domain/entities/Achievement';
import {
  CreateAchievementModel,
  ICreateAchievement,
} from '../../domain/usecases/Achievement/create';
import { ICreateAchievement as ICreateAchievementRepository } from '../../repositories/Achievement/interfaces/ICreateAchievement';

class CreateAchievementService implements ICreateAchievement {
  private createAchievement;

  constructor(createAchievement: ICreateAchievementRepository) {
    this.createAchievement = createAchievement;
  }

  async create(
    createAchievementModel: CreateAchievementModel,
  ): Promise<Achievement> {
    return this.createAchievement.create(createAchievementModel);
  }
}

export default CreateAchievementService;
