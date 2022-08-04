import Joi from 'joi';

const theoricLessonSchema = Joi.object({
  lessonName: Joi.string().required(),
  xpEarned: Joi.number().min(0).required(),
  description: Joi.string().required(),
  content: Joi.string().required(),
  moduleId: Joi.string().required(),
});

export default theoricLessonSchema;
