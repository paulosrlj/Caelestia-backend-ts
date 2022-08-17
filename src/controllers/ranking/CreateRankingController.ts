import { Request, Response } from 'express';
import { ICreateRanking } from '../../domain/usecases/Ranking/create-ranking';
import ValidationError from '../../exceptions/ValidationError';
import rankingSchema from '../../helpers/validationSchemas/rankingSchema';
import { ICreate } from '../interfaces/create';

class CreateRankingController implements ICreate {
  private createService;

  constructor(createService: ICreateRanking) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await rankingSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerPersisted = await this.createService.create(req.body);

    return res.status(200).json(playerPersisted);
  }
}

export default CreateRankingController;
