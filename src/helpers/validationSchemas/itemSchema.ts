import Joi from 'joi';

const itemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  individualItemId: Joi.number().required(),
});

export { itemSchema };
