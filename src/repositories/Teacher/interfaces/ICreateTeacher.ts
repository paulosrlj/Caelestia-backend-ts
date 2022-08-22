import { Teacher } from '../../../domain/entities/Teacher';
import { createTeacherModel } from '../../../domain/usecases/Teacher/create-teacher';

export interface ICreateTeacher {
  create(teacherModel: createTeacherModel): Promise<Teacher>;
}
