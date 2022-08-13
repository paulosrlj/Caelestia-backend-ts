import { Request, Response } from 'express';

import { ICreate } from '../interfaces/create';

import { ICreateTheoricLesson } from '../../domain/usecases/TheoricLesson/create';
import ValidationError from '../../exceptions/ValidationError';
import { theoricLessonSchema } from '../../helpers/validationSchemas/theoricLessonSchema';

class CreateTheoricLessonController implements ICreate {
  private createService;

  constructor(createService: ICreateTheoricLesson) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await theoricLessonSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const theoricLessonPersisted = await this.createService.create(req.body);
    return res.status(200).json(theoricLessonPersisted);
  }
}

export default CreateTheoricLessonController;
