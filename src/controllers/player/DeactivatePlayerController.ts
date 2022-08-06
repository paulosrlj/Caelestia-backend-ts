import { Request, Response } from 'express';
import { IDeactivatePlayer } from '../../domain/usecases/Player/deactivatePlayer';
import BadRequest from '../../exceptions/BadRequest';
import { IDelete } from '../interfaces/delete';

class DeactivatePlayerController implements IDelete {
  private deactivateService;

  constructor(deactivateService: IDeactivatePlayer) {
    this.deactivateService = deactivateService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (!req.query.email) throw new BadRequest('O email não está presente');

    await this.deactivateService.delete(req.query.email.toString());

    return res.status(204).send();
  }
}

export default DeactivatePlayerController;
