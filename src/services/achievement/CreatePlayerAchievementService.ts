import jwt from 'jsonwebtoken';

import { PlayerAchievements } from '@prisma/client';
import {
  CreatePlayerAchievementModel,
  ICreatePlayerAchievement,
} from '../../domain/usecases/Achievement/create-player-achievement';
import { IFindByIdAchievement } from '../../domain/usecases/Achievement/findById';
import { ICreatePlayerAchievement as ICreatePlayerAchievementRepository } from '../../repositories/Achievement/interfaces/ICreatePlayerAchievement';
import InvalidToken from '../../exceptions/InvalidToken';

class CreatePlayerAchievementService implements ICreatePlayerAchievement {
  private createPlayerAchievementRepository;

  private findAchievementService;

  constructor(
    createPlayerAchievementRepository: ICreatePlayerAchievementRepository,
    findAchievementService: IFindByIdAchievement,
  ) {
    this.createPlayerAchievementRepository = createPlayerAchievementRepository;
    this.findAchievementService = findAchievementService;
  }

  async createPlayerAchievement({
    token,
    achievementId,
  }: CreatePlayerAchievementModel): Promise<PlayerAchievements> {
    let { levelUpPrice } = await this.findAchievementService.findById(
      achievementId,
    );
    // Preço atual de levelUp da conquista + 10%
    if (levelUpPrice) {
      levelUpPrice += levelUpPrice * 0.1;
    }

    let playerId;

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
      if (err) throw new InvalidToken('O token é inválido');
      playerId = decoded.id;
    });

    return this.createPlayerAchievementRepository.createPlayerAchievement({
      playerId: playerId ?? '',
      achievementId,
      currentLevelUpPrice: levelUpPrice ?? 0,
    });
  }
}

export default CreatePlayerAchievementService;
