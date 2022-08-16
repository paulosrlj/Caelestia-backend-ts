import { PlayerAchievements } from '@prisma/client';

export interface playerAchievementModelRepository {
  moduleId: string;
  playerId: string;
}

export interface ICreatePlayerAchievement {
  createPlayerAchievement(
    playerAchievement: playerAchievementModelRepository,
  ): Promise<PlayerAchievements>;
}
