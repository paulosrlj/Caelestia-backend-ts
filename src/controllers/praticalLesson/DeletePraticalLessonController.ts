import { Request, Response } from 'express';

import { IDeletePraticalLesson } from '../../domain/usecases/PraticalLesson/delete';
import BadRequest from '../../exceptions/BadRequest';
import { IDelete } from '../interfaces/delete';

class DeletePraticalLessonController implements IDelete {
  private deleteService;

  constructor(deleteService: IDeletePraticalLesson) {
    this.deleteService = deleteService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    if (req.params.id === null) throw new BadRequest('O id não está presente');

    await this.deleteService.delete(req.params.id);

    return res.status(204).send();
  }
}

export default DeletePraticalLessonController;
