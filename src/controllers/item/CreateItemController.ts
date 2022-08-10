import { Request, Response } from 'express';
import { ICreateItem } from '../../domain/usecases/Item/Create';
import ValidationError from '../../exceptions/ValidationError';
import { itemSchema } from '../../helpers/validationSchemas/itemSchema';
import { ICreate } from '../interfaces/create';

class CreateItemController implements ICreate {
  private createService;

  constructor(createService: ICreateItem) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await itemSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const item = await this.createService.create(req.body);

    return res.status(200).json(item);
  }
}

export default CreateItemController;
