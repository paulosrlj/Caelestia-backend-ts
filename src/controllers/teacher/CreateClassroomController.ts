import { Request, Response } from 'express';
import { ICreateClassroom } from '../../domain/usecases/Teacher/create-classroom';
import ValidationError from '../../exceptions/ValidationError';
import { createClassroomSchema } from '../../helpers/validationSchemas/teacherSchema';
import { ICreate } from '../interfaces/create';

class CreateClassroomController implements ICreate {
  private createService;

  constructor(createService: ICreateClassroom) {
    this.createService = createService;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await createClassroomSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const classroom = await this.createService.createClassroom(req.body);

    return res.status(200).json(classroom);
  }
}

export default CreateClassroomController;
