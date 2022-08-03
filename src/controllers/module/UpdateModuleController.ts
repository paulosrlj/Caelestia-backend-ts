import { Request, Response } from 'express';

import { IUpdateModule } from '../../domain/usecases/Module/update';
import { IUpdate } from '../interfaces/update';
import BadRequest from '../../exceptions/BadRequest';

class UpdateModuleController implements IUpdate {
  private updateService;

  constructor(updateService: IUpdateModule) {
    this.updateService = updateService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');
    if (!req.body) return res.status(204).send();

    const module = await this.updateService.update(req.params.id, req.body);

    const responseModule = {
      id: module.id,
      name: module.name,
    };

    return res.status(200).json(responseModule);
  }
}

export default UpdateModuleController;
