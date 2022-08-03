import Joi from 'joi';

const moduleSchema = Joi.object({
  name: Joi.string().required(),
});

export default moduleSchema;
