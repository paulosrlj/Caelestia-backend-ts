import { Request, Response } from 'express';
import { ICreateTeacher } from '../../domain/usecases/Teacher/create-teacher';
import ValidationError from '../../exceptions/ValidationError';
import teacherPresentation from '../../helpers/presentationModels/teacherPresentation';
import { teacherSchema } from '../../helpers/validationSchemas/teacherSchema';
import { ICreate } from '../interfaces/create';

class CreateTeacherController implements ICreate {
  private createService;

  constructor(createService: ICreateTeacher) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await teacherSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const teacherPersisted = await this.createService.create(req.body);

    const teacherToDisplay = teacherPresentation(teacherPersisted);

    return res.status(200).json(teacherToDisplay);
  }
}

export default CreateTeacherController;
