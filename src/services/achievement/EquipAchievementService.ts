import { PlayerAchievements } from '@prisma/client';
import {
  equipAchievementModel,
  IEquipPlayerAchievement,
} from '../../domain/usecases/Achievement/equipAchievement';
import { IEquipPlayerAchievement as IEquipPlayerAchievementRepository } from '../../repositories/Achievement/interfaces/IEquipAchievement';

class EquipAchievementService implements IEquipPlayerAchievement {
  private equipAchievementRepository;

  constructor(equipAchievementRepository: IEquipPlayerAchievementRepository) {
    this.equipAchievementRepository = equipAchievementRepository;
  }

  async createPlayerAchievement(
    equipModel: equipAchievementModel,
  ): Promise<PlayerAchievements> {
    return this.equipAchievementRepository.equipPlayerAchievement(equipModel);
  }
}

export default EquipAchievementService;
