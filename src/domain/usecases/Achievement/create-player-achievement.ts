import { PlayerAchievements } from '@prisma/client';

export interface CreatePlayerAchievementModel {
  moduleId: string;
  playerId: string;
}

export interface ICreatePlayerAchievement {
  createPlayerAchievement(
    createPlayerAchievementModel: CreatePlayerAchievementModel,
  ): Promise<PlayerAchievements>;
}
