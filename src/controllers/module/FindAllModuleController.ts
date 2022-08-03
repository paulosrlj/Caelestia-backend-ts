import { Request, Response } from 'express';

import { IFindAll } from '../interfaces/findAll';
import { IFindAllModule } from '../../domain/usecases/Module/findAll';

class FindAllModuleController implements IFindAll {
  private findAllService;

  constructor(findAllService: IFindAllModule) {
    this.findAllService = findAllService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    const modules = await this.findAllService.findAll();

    return res.status(200).json(modules);
  }
}

export default FindAllModuleController;
