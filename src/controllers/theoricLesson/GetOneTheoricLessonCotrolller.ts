import { Request, Response } from 'express';

import { IGetOneTheoricLesson } from '../../domain/usecases/TheoricLesson/get-one';
import { IFindById } from '../interfaces/findById';

class GetOneTheoricLessonCotrolller implements IFindById {
  private getOneService;

  constructor(getOneService: IGetOneTheoricLesson) {
    this.getOneService = getOneService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    const lessonFound = await this.getOneService.getOne(req.params.id);

    return res.status(200).json(lessonFound);
  }
}

export default GetOneTheoricLessonCotrolller;
