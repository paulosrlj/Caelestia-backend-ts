import Joi from 'joi';

const achievementSchema = Joi.object({
  achievementName: Joi.string().required(),
  description: Joi.string().required(),
  bonusPercentage: Joi.number().required(),
  addBonusPercentagePerLevel: Joi.number().required(),
  bonusType: Joi.string().required(),
  achievementBadge: Joi.string().uri().required(),
  levelUpPrice: Joi.number().required(),
});

const playerAchievementSchema = Joi.object({
  moduleId: Joi.string().required(),
  playerId: Joi.string().required(),
});

const equipPlayerAchievementSchema = Joi.object({
  playerId: Joi.string().required(),
  achievementId: Joi.string().required(),
});

export {
  achievementSchema,
  playerAchievementSchema,
  equipPlayerAchievementSchema,
};
