import { Request, Response } from 'express';
import { Player } from '../../domain/entities/Player';
import { IFindByEmailPlayer } from '../../domain/usecases/Player/findByEmail';
import { IFindById } from '../interfaces/findById';

interface _countType {
  theoricLessons: number;
  praticalLessons: number;
  friend: number;
}

interface relationColumns extends Player {
  _count: _countType;
}

class FindByEmailPlayerController implements IFindById {
  private findByEmailService;

  constructor(findByEmailService: IFindByEmailPlayer) {
    this.findByEmailService = findByEmailService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    const playerFound = (await this.findByEmailService.findByEmail(
      req.params.email,
    )) as relationColumns;

    return res.status(200).json(playerFound);
  }
}

export default FindByEmailPlayerController;
