import { Request, Response } from 'express';
import { ILevelUpPlayer } from '../../domain/usecases/Player/levelUpPlayer';
import ValidationError from '../../exceptions/ValidationError';
import { levelUpPlayerSchema } from '../../helpers/validationSchemas/playerSchema';
import { IUpdate } from '../interfaces/update';

class LevelUpPlayerController implements IUpdate {
  private levelUpService;

  constructor(levelUpService: ILevelUpPlayer) {
    this.levelUpService = levelUpService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (!req.body) return res.status(204).send();

    try {
      await levelUpPlayerSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }

    const playerPersisted = await this.levelUpService.levelUpPlayer(req.body);

    return res.status(200).json(playerPersisted);
  }
}

export default LevelUpPlayerController;
