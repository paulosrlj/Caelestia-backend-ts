import { Request, Response } from 'express';

import { ICreate } from '../interfaces/create';

import { ICreatePraticalLesson } from '../../domain/usecases/PraticalLesson/create';
import ValidationError from '../../exceptions/ValidationError';
import { praticalLessonSchema } from '../../helpers/validationSchemas/praticalLessonSchema';

class CreatePraticalLessonController implements ICreate {
  private createService;

  constructor(createService: ICreatePraticalLesson) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await praticalLessonSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const praticalLessonPersisted = await this.createService.create(req.body);
    return res.status(200).json(praticalLessonPersisted);
  }
}

export default CreatePraticalLessonController;
