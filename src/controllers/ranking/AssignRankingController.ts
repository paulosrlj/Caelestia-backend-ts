import { Request, Response } from 'express';
import { IAssignRanking } from '../../domain/usecases/Ranking/assignRanking';
import ValidationError from '../../exceptions/ValidationError';
import { assignRankSchema } from '../../helpers/validationSchemas/rankingSchema';
import { ICreate } from '../interfaces/create';

class AssignRankingController implements ICreate {
  private createService;

  constructor(createService: IAssignRanking) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await assignRankSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const playerPersisted = await this.createService.assignRanking(req.body);

    return res.status(200).json(playerPersisted);
  }
}

export default AssignRankingController;
