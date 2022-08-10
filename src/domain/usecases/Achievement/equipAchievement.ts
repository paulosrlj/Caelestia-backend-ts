import { PlayerAchievements } from '@prisma/client';

export interface equipAchievementModel {
  achievementId: string;
  playerId: string;
}

export interface IEquipPlayerAchievement {
  createPlayerAchievement(
    equipModel: equipAchievementModel,
  ): Promise<PlayerAchievements>;
}
