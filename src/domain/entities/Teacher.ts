export interface Teacher {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  institution?: string;
  cpf?: string;

  urlProfileImg?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
