import { Request, Response } from 'express';

import { IEquipPlayerAchievement } from '../../domain/usecases/Achievement/equipAchievement';
import ValidationError from '../../exceptions/ValidationError';
import { equipPlayerAchievementSchema } from '../../helpers/validationSchemas/achievementSchema';
import { IUpdate } from '../interfaces/update';

class EquipAchievement implements IUpdate {
  private updateService;

  constructor(updateService: IEquipPlayerAchievement) {
    this.updateService = updateService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await equipPlayerAchievementSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerAchievementPersisted =
      await this.updateService.createPlayerAchievement(req.body);
    return res.status(200).json(playerAchievementPersisted);
  }
}

export default EquipAchievement;
