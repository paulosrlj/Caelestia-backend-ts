import { Request, Response } from 'express';
import { ICreatePlayer } from '../../domain/usecases/Player/create';
import ValidationError from '../../exceptions/ValidationError';
import playerPresentation from '../../helpers/presentationModels/playerPresentation';
import { playerSchema } from '../../helpers/validationSchemas/playerSchema';
import { ICreate } from '../interfaces/create';

class CreatePlayerController implements ICreate {
  private createService;

  constructor(createService: ICreatePlayer) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await playerSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerPersisted = await this.createService.create(req.body);

    const playerToDisplay = playerPresentation(playerPersisted);

    return res.status(200).json(playerToDisplay);
  }
}

export default CreatePlayerController;
