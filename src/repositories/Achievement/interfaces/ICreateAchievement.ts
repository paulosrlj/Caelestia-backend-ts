import { Achievement } from '../../../domain/entities/Achievement';
import { CreateAchievementModel } from '../../../domain/usecases/Achievement/create';

export interface ICreateAchievement {
  create(achievement: CreateAchievementModel): Promise<Achievement>;
}
