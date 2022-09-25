import { Request, Response } from 'express';
import { IGetAllPlayersOfRanking } from '../../domain/usecases/Ranking/getAllPlayersOfRanking';
import ValidationError from '../../exceptions/ValidationError';
import { getAllPlayersSchema } from '../../helpers/validationSchemas/rankingSchema';
import { ICreate } from '../interfaces/create';

class GetAllPlayersRank implements ICreate {
  private getAll;

  constructor(getAll: IGetAllPlayersOfRanking) {
    this.getAll = getAll;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    let playerPersisted;

    try {
      playerPersisted = await this.getAll.GetAllPlayersOfRank({
        playerEmail: req.params.email,
      });
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }

    return res.status(200).json(playerPersisted);
  }
}

export default GetAllPlayersRank;
