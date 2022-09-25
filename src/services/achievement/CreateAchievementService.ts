import { Achievement } from '../../domain/entities/Achievement';
import {
  CreateAchievementModel,
  ICreateAchievement,
} from '../../domain/usecases/Achievement/create';
import { ICreateAchievement as ICreateAchievementRepository } from '../../repositories/Achievement/interfaces/ICreateAchievement';
import { IFindModuleById } from '../../repositories/Module/interfaces/IFindById';

class CreateAchievementService implements ICreateAchievement {
  private createAchievement;

  private findModule;

  constructor(
    createAchievement: ICreateAchievementRepository,
    findModule: IFindModuleById,
  ) {
    this.createAchievement = createAchievement;
    this.findModule = findModule;
  }

  async create(
    createAchievementModel: CreateAchievementModel,
  ): Promise<Achievement> {
    return this.createAchievement.create(createAchievementModel);
  }
}

export default CreateAchievementService;
