import { PlayerAchievements } from '@prisma/client';

export interface playerAchievementModelRepository {
  playerId: string;
  achievementId: string;
  currentLevelUpPrice: number;
}

export interface ICreatePlayerAchievement {
  createPlayerAchievement(
    playerAchievement: playerAchievementModelRepository,
  ): Promise<PlayerAchievements>;
}
