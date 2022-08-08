import Joi from 'joi';

const achievementSchema = Joi.object({
  achievementName: Joi.string().required(),
  description: Joi.string().required(),
  bonusPercentage: Joi.number().required(),
  bonusType: Joi.string().required(),
  achievementBadge: Joi.string().uri().required(),
});

export default achievementSchema;
