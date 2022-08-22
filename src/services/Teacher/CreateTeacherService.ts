import bcrypt from 'bcrypt';
import { Teacher } from '../../domain/entities/Teacher';
import {
  createTeacherModel,
  ICreateTeacher,
} from '../../domain/usecases/Teacher/create-teacher';
import { ICreateTeacher as ICreateTeacherRepository } from '../../repositories/Teacher/interfaces/ICreateTeacher';

class CreateTeacherService implements ICreateTeacher {
  private createTeacher;

  constructor(createTeacher: ICreateTeacherRepository) {
    this.createTeacher = createTeacher;
  }

  async create(teacherModel: createTeacherModel): Promise<Teacher> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(teacherModel.password, salt);
    teacherModel.password = hashedPassword;

    return this.createTeacher.create(teacherModel);
  }
}

export default CreateTeacherService;
