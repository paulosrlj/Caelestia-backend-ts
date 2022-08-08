import { Achievement } from '../../entities/Achievement';

export interface CreateAchievementModel {
  achievementName: string;
  description: string;
  bonusPercentage: number;
  bonusType: string;
  achievementBadge: string;
}

export interface ICreateAchievement {
  create(createAchievementModel: CreateAchievementModel): Promise<Achievement>;
}
