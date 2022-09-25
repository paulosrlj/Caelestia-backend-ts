import { Achievement } from '../../entities/Achievement';

export interface CreateAchievementModel {
  achievementName: string;
  description: string;
  bonusPercentage: number;
  addBonusPercentagePerLevel: number;
  bonusType: string;
  levelUpPrice: number;
  achievementBadge: string;
}

export interface ICreateAchievement {
  create(createAchievementModel: CreateAchievementModel): Promise<Achievement>;
}
