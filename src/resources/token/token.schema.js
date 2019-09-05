const Joi = require('joi');
const { TOKEN_TYPES } = require('app.constants');

const tokenSchema = {
  _id: Joi.string(),
  type: Joi.string().only(TOKEN_TYPES.REFRESH, TOKEN_TYPES.ACCESS).required(),
  value: Joi.string().required(),
  expireAt: Joi.date().required(),
  userId: Joi.string().required(),
};

module.exports = obj => Joi.validate(obj, tokenSchema, { allowUnknown: true });
