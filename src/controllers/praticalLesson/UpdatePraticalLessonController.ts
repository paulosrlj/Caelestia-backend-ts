import { Request, Response } from 'express';

import { IUpdatePraticalLesson } from '../../domain/usecases/PraticalLesson/update';
import BadRequest from '../../exceptions/BadRequest';
import { IUpdate } from '../interfaces/update';

class UpdatePraticalLessonController implements IUpdate {
  private updateService;

  constructor(updateService: IUpdatePraticalLesson) {
    this.updateService = updateService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');
    if (!req.body) return res.status(204).send();

    const praticalLessonUpdated = await this.updateService.update(
      req.params.id,
      req.body,
    );

    return res.status(200).json(praticalLessonUpdated);
  }
}

export default UpdatePraticalLessonController;
