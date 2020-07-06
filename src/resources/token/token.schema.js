const Joi = require('joi');
const { TOKEN_TYPES } = require('app.constants');

const tokenSchema = {
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  type: Joi.string()
    .only(TOKEN_TYPES.ACCESS)
    .required(),
  value: Joi.string()
    .required(),
  userId: Joi.string()
    .required(),
  isShadow: Joi.boolean(),
};

module.exports = (obj) => Joi.validate(obj, tokenSchema, { allowUnknown: false });
