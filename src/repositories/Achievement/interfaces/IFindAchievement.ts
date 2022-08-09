import { Achievement } from '../../../domain/entities/Achievement';

export interface IFindAchievement {
  findById(achievementId: string): Promise<Achievement>;
}
