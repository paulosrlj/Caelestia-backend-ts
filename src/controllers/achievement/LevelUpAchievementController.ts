import { Request, Response } from 'express';

import { ILevelUpAchievement } from '../../domain/usecases/Achievement/levelUpPlayerAchievement';
import ValidationError from '../../exceptions/ValidationError';
import { equipPlayerAchievementSchema } from '../../helpers/validationSchemas/achievementSchema';
import { IUpdate } from '../interfaces/update';

class LevelUpAchievementController implements IUpdate {
  private levelUpService;

  constructor(levelUpService: ILevelUpAchievement) {
    this.levelUpService = levelUpService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await equipPlayerAchievementSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerAchievementPersisted =
      await this.levelUpService.levelUpAchievement(req.body);
    return res.status(200).json(playerAchievementPersisted);
  }
}

export default LevelUpAchievementController;
