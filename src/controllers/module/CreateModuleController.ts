import { Request, Response } from 'express';

import { ICreateModule } from '../../domain/usecases/Module/create';
import { ICreate } from '../interfaces/create';

import moduleSchema from '../../helpers/validationSchemas/moduleSchema';
import ValidationError from '../../exceptions/ValidationError';

class CreateModuleController implements ICreate {
  private createService;

  constructor(createService: ICreateModule) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await moduleSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const modulePersisted = await this.createService.create(req.body);
    return res.status(200).json(modulePersisted);
  }
}

export default CreateModuleController;
