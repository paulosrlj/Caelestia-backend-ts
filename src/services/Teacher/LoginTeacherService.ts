import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  ILoginTeacher,
  LoginTeacherModel,
} from '../../domain/usecases/Teacher/login-teacher';
import WrongPassword from '../../exceptions/WrongPassword';
import { ILoginTeacher as ILoginTeacherRepository } from '../../repositories/Teacher/interfaces/ILoginTeacher';

class LoginTeacherService implements ILoginTeacher {
  private loginTeacherRepo;

  constructor(loginTeacher: ILoginTeacherRepository) {
    this.loginTeacherRepo = loginTeacher;
  }

  async loginTeacher(teacher: LoginTeacherModel): Promise<string> {
    const teacherFound = await this.loginTeacherRepo.loginTeacher(
      teacher.email,
    );

    const comparation = await bcrypt.compare(
      teacher.password,
      teacherFound.password as string,
    );
    if (!comparation) {
      throw new WrongPassword(`A senha está incorreta`);
    }

    const token = jwt.sign(
      { id: teacherFound.id, email: teacherFound.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      },
    );

    return token;
  }
}

export default LoginTeacherService;
