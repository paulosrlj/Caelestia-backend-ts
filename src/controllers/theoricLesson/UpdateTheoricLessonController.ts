import { Request, Response } from 'express';

import { IUpdate } from '../interfaces/update';
import { IUpdateTheoricLesson } from '../../domain/usecases/TheoricLesson/update';
import BadRequest from '../../exceptions/BadRequest';

class UpdateTheoricLessonController implements IUpdate {
  private updateService;

  constructor(updateService: IUpdateTheoricLesson) {
    this.updateService = updateService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');
    if (!req.body) return res.status(204).send();

    const theoricLessonUpdated = await this.updateService.update(
      req.params.id,
      req.body,
    );

    return res.status(200).json(theoricLessonUpdated);
  }
}

export default UpdateTheoricLessonController;
