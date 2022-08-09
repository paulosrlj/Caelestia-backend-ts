import { Request, Response } from 'express';

import { ICreate } from '../interfaces/create';

import { ICreateAchievement } from '../../domain/usecases/Achievement/create';
import ValidationError from '../../exceptions/ValidationError';
import { achievementSchema } from '../../helpers/validationSchemas/achievementSchema';

class CreateAchievementController implements ICreate {
  private createService;

  constructor(createService: ICreateAchievement) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await achievementSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const achievementPersisted = await this.createService.create(req.body);
    return res.status(200).json(achievementPersisted);
  }
}

export default CreateAchievementController;
