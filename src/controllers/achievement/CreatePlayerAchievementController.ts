import { Request, Response } from 'express';

import { ICreate } from '../interfaces/create';

import { ICreatePlayerAchievement } from '../../domain/usecases/Achievement/create-player-achievement';
import ValidationError from '../../exceptions/ValidationError';
import { playerAchievementSchema } from '../../helpers/validationSchemas/achievementSchema';

class CreatePlayerAchievementController implements ICreate {
  private createService;

  constructor(createService: ICreatePlayerAchievement) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await playerAchievementSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerAchievementPersisted =
      await this.createService.createPlayerAchievement(req.body);
    return res.status(200).json(playerAchievementPersisted);
  }
}

export default CreatePlayerAchievementController;
