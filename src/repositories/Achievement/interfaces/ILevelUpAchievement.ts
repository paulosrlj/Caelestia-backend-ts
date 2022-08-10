import { PlayerAchievements } from '@prisma/client';
import { levelUpAchievementModel } from '../../../domain/usecases/Achievement/levelUpPlayerAchievement';

export interface ILevelUpAchievement {
  levelUpAchievement(
    levelUpAc: levelUpAchievementModel,
  ): Promise<PlayerAchievements>;
}
