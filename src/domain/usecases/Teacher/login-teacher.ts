export interface LoginTeacherModel {
  email: string;
  password: string;
}

export interface ILoginTeacher {
  loginTeacher(teacher: LoginTeacherModel): Promise<string>;
}
