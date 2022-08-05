import Joi from 'joi';

const playerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30),
  nickname: Joi.string().min(3).max(20),
  name: Joi.string().required(),
});

export default playerSchema;
