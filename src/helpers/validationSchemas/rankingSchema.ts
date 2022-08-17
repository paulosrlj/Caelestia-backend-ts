import Joi from 'joi';

const rankingSchema = Joi.object({
  rankingName: Joi.string().required(),
  urlRankingBadge: Joi.string().uri().required(),
  pointsToPromotion: Joi.number().required(),
});

export default rankingSchema;
