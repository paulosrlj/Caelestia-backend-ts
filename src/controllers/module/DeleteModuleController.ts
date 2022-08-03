import { Request, Response } from 'express';

import BadRequest from '../../exceptions/BadRequest';
import { IDelete } from '../interfaces/delete';
import { IDeleteModuleById } from '../../domain/usecases/Module/delete';

class DeleteModule implements IDelete {
  private deleteService;

  constructor(deleteService: IDeleteModuleById) {
    this.deleteService = deleteService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');

    await this.deleteService.delete(req.params.id);

    return res.status(204).send();
  }
}

export default DeleteModule;
