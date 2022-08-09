import { PlayerAchievements } from '@prisma/client';

export interface CreatePlayerAchievementModel {
  token: string;
  achievementId: string;
}

export interface ICreatePlayerAchievement {
  createPlayerAchievement(
    createPlayerAchievementModel: CreatePlayerAchievementModel,
  ): Promise<PlayerAchievements>;
}
