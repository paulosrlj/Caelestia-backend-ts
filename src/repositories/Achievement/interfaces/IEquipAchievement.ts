import { PlayerAchievements } from '@prisma/client';
import { equipAchievementModel } from '../../../domain/usecases/Achievement/equipAchievement';

export interface IEquipPlayerAchievement {
  equipPlayerAchievement(
    equipModel: equipAchievementModel,
  ): Promise<PlayerAchievements>;
}
