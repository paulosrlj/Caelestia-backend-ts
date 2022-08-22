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
    return this.createTeacher.create(teacherModel);
  }
}

export default CreateTeacherService;
