import { Teacher } from '../../../domain/entities/Teacher';

export interface ILoginTeacher {
  loginTeacher(email: string): Promise<Teacher>;
}
