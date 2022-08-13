import { Request, Response } from 'express';

import { ICreate } from '../interfaces/create';

import { ICompletePraticalLesson } from '../../domain/usecases/PraticalLesson/complete-lesson';
import ValidationError from '../../exceptions/ValidationError';
import { completePlSchema } from '../../helpers/validationSchemas/praticalLessonSchema';

class CompletePraticalLessonController implements ICreate {
  private completeLessonService;

  constructor(completeLessonService: ICompletePraticalLesson) {
    this.completeLessonService = completeLessonService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await completePlSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const completePlPersisted = await this.completeLessonService.completePL(
      req.body,
    );
    return res.status(200).json(completePlPersisted);
  }
}

export default CompletePraticalLessonController;
