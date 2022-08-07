import Joi from 'joi';

const playerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  nickname: Joi.string().min(3).max(20).required(),
  name: Joi.string().required(),
});

const playerUpdateSchema = Joi.object({
  password: Joi.string().min(6).max(30),
  nickname: Joi.string().min(3).max(20),
  name: Joi.string(),
  totalPoints: Joi.number(),
  level: Joi.number().min(1),
  coins: Joi.number(),
  urlProfileImg: Joi.string(),
});

const loginPlayerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
});

export { playerSchema, playerUpdateSchema, loginPlayerSchema };
