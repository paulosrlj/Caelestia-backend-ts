import Joi from 'joi';

const praticalLessonSchema = Joi.object({
  lessonName: Joi.string().required(),
  xpEarned: Joi.number().min(0).required(),
  coinsEarned: Joi.number().min(0).required(),
  description: Joi.string().required(),
  alternative1: Joi.string().required(),
  alternative2: Joi.string().required(),
  alternative3: Joi.string().required(),
  alternative4: Joi.string().required(),
  correctAlternative: Joi.number().required().min(1).max(4),
  urlAlternative1: Joi.string().uri(),
  urlAlternative2: Joi.string().uri(),
  urlAlternative3: Joi.string().uri(),
  urlAlternative4: Joi.string().uri(),

  moduleId: Joi.string().required(),
});

const completePlSchema = Joi.object({
  lessonId: Joi.string().required(),
  playerId: Joi.string().required(),
});

export { praticalLessonSchema, completePlSchema };
