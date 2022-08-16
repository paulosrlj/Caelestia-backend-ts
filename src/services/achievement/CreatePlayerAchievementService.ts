import { PlayerAchievements } from '@prisma/client';
import {
  CreatePlayerAchievementModel,
  ICreatePlayerAchievement,
} from '../../domain/usecases/Achievement/create-player-achievement';
import { ICreatePlayerAchievement as ICreatePlayerAchievementRepository } from '../../repositories/Achievement/interfaces/ICreatePlayerAchievement';

class CreatePlayerAchievementService implements ICreatePlayerAchievement {
  private createPlayerAchievementRepository;

  constructor(
    createPlayerAchievementRepository: ICreatePlayerAchievementRepository,
  ) {
    this.createPlayerAchievementRepository = createPlayerAchievementRepository;
  }

  async createPlayerAchievement(
    createPlayerAcModel: CreatePlayerAchievementModel,
  ): Promise<PlayerAchievements> {
    return this.createPlayerAchievementRepository.createPlayerAchievement(
      createPlayerAcModel,
    );
  }
}

export default CreatePlayerAchievementService;
