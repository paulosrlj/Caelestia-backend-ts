import Joi from 'joi';

const pattern =
  /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/;

const teacherSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).max(30).required(),
  cpf: Joi.string().regex(pattern).required().messages({
    'string.pattern.base': 'Cpf inválido',
  }),
  institution: Joi.string().required(),
});

const loginTeacherSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

const createClassroomSchema = Joi.object({
  teacherId: Joi.string().required(),
  name: Joi.string().required(),
});

export { teacherSchema, loginTeacherSchema, createClassroomSchema };
