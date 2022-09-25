import Joi from 'joi';

const moduleSchema = Joi.object({
  name: Joi.string().required(),
  achievementId: Joi.string().required(),
});

export default moduleSchema;
