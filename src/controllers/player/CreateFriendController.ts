import { Request, Response } from 'express';
import { IAddFriend } from '../../domain/usecases/Player/add-friend';
import ValidationError from '../../exceptions/ValidationError';
import { createFriendSchema } from '../../helpers/validationSchemas/playerSchema';
import { ICreate } from '../interfaces/create';

class CreateFriendController implements ICreate {
  private createService;

  constructor(createService: IAddFriend) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await createFriendSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerPersisted = await this.createService.addFriend(req.body);

    return res.status(200).json(playerPersisted);
  }
}

export default CreateFriendController;
