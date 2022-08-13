import { Request, Response } from 'express';

import { ICreate } from '../interfaces/create';

import { ICompleteTheoricLesson } from '../../domain/usecases/TheoricLesson/complete-lesson';
import ValidationError from '../../exceptions/ValidationError';
import { completeTlSchema } from '../../helpers/validationSchemas/theoricLessonSchema';

class CompleteTheoricLessonController implements ICreate {
  private completeLessonService;

  constructor(completeLessonService: ICompleteTheoricLesson) {
    this.completeLessonService = completeLessonService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await completeTlSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const completeTlPersisted = await this.completeLessonService.completeTL(
      req.body,
    );
    return res.status(200).json(completeTlPersisted);
  }
}

export default CompleteTheoricLessonController;
