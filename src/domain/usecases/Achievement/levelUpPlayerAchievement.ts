import { PlayerAchievements } from '@prisma/client';

export interface levelUpAchievementModel {
  playerId: string;
  achievementId: string;
}

export interface ILevelUpAchievement {
  levelUpAchievement(
    levelUpAcModel: levelUpAchievementModel,
  ): Promise<PlayerAchievements>;
}
