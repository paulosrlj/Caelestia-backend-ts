import { Request, Response } from 'express';
import { ILoginTeacher } from '../../domain/usecases/Teacher/login-teacher';
import ValidationError from '../../exceptions/ValidationError';
import { loginTeacherSchema } from '../../helpers/validationSchemas/teacherSchema';
import { IFindById } from '../interfaces/findById';

class LoginTeacherController implements IFindById {
  private loginTeacher;

  constructor(loginTeacher: ILoginTeacher) {
    this.loginTeacher = loginTeacher;
  }

  async handle(req: Request, res: Response): Promise<Express.Response> {
    try {
      await loginTeacherSchema.validateAsync(req.body);
    } catch (error: any) {
      if (error.isJoi) throw new ValidationError(error.name, error.details);
    }
    const token = await this.loginTeacher.loginTeacher(req.body);

    return res.status(200).json({
      email: req.body.email,
      password: req.body.password,
      token,
      userType: 'teacher',
    });
  }
}

export default LoginTeacherController;
