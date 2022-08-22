import { Teacher } from '../../entities/Teacher';

export interface createTeacherModel {
  email: string;
  password: string;
  name: string;
  institution: string;
  cpf: string;
}

export interface ICreateTeacher {
  create(teacherModel: createTeacherModel): Promise<Teacher>;
}
