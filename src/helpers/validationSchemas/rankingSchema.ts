import Joi from 'joi';

const rankingSchema = Joi.object({
  rankingName: Joi.string().required(),
  urlRankingBadge: Joi.string().uri().required(),
  pointsToPromotion: Joi.number().required(),
});

const assignRankSchema = Joi.object({
  playerId: Joi.string().required(),
  rankingIndividualId: Joi.number().required(),
});

const getAllPlayersSchema = Joi.object({
  playerEmail: Joi.string().required(),
});

export { assignRankSchema, rankingSchema, getAllPlayersSchema };
