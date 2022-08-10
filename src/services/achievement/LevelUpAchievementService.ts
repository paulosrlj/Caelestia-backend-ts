import { PlayerAchievements } from '@prisma/client';
import {
  ILevelUpAchievement,
  levelUpAchievementModel,
} from '../../domain/usecases/Achievement/levelUpPlayerAchievement';
import { ILevelUpAchievement as ILevelUpAchievementRepository } from '../../repositories/Achievement/interfaces/ILevelUpAchievement';

class LevelUpAchievementService implements ILevelUpAchievement {
  private levelUpAc;

  constructor(levelUpAc: ILevelUpAchievementRepository) {
    this.levelUpAc = levelUpAc;
  }

  async levelUpAchievement(
    levelUpAcModel: levelUpAchievementModel,
  ): Promise<PlayerAchievements> {
    return this.levelUpAc.levelUpAchievement(levelUpAcModel);
  }
}

export default LevelUpAchievementService;
