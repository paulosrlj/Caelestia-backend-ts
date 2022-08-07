import { Request, Response } from 'express';
import { IUpdatePlayer } from '../../domain/usecases/Player/update';
import BadRequest from '../../exceptions/BadRequest';
import ValidationError from '../../exceptions/ValidationError';
import { playerUpdateSchema } from '../../helpers/validationSchemas/playerSchema';
import { IUpdate } from '../interfaces/update';

class UpdatePlayerController implements IUpdate {
  private updateService;

  constructor(updateService: IUpdatePlayer) {
    this.updateService = updateService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');
    if (!req.body) return res.status(204).send();

    try {
      await playerUpdateSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }

    const playerPersisted = await this.updateService.update(
      req.params.email,
      req.body,
    );

    return res.status(200).json(playerPersisted);
  }
}

export default UpdatePlayerController;
