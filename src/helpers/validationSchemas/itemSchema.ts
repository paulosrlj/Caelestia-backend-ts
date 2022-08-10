import Joi from 'joi';

const itemSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  individualItemId: Joi.number().required(),
});

const buyItemSchema = Joi.object({
  price: Joi.number().required(),
  itemId: Joi.string().required(),
  playerId: Joi.string().required(),
});

export { itemSchema, buyItemSchema };
