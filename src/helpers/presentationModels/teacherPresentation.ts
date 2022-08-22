import { Teacher } from '../../domain/entities/Teacher';

function teacherPresentation({ id, email, name, cpf, institution }: Teacher) {
  return {
    id,
    email,
    name,
    cpf,
    institution,
  };
}

export default teacherPresentation;
