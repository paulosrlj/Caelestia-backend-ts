import { Request, Response } from 'express';
import { IBuyPlayerItem } from '../../domain/usecases/Item/BuyPlayerItem';
import ValidationError from '../../exceptions/ValidationError';
import { buyItemSchema } from '../../helpers/validationSchemas/itemSchema';
import { IUpdate } from '../interfaces/update';

class BuyItemController implements IUpdate {
  private buyItemService;

  constructor(buyItemService: IBuyPlayerItem) {
    this.buyItemService = buyItemService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await buyItemSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const item = await this.buyItemService.buyPlayerItem(req.body);

    return res.status(200).json(item);
  }
}

export default BuyItemController;
