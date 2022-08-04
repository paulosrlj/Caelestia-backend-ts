import { Request, Response } from 'express';

import BadRequest from '../../exceptions/BadRequest';
import { IDeleteTheoricLesson } from '../../domain/usecases/TheoricLesson/delete';
import { IDelete } from '../interfaces/delete';

class DeleteTheoricLessonController implements IDelete {
  private deleteService;

  constructor(deleteService: IDeleteTheoricLesson) {
    this.deleteService = deleteService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');

    await this.deleteService.delete(req.params.id);

    return res.status(204).send();
  }
}

export default DeleteTheoricLessonController;
