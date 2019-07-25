const Joi = require('joi');

const schema = {
  _id: Joi.string(),
  companyId: Joi.string()
    .required(),
  startTime: Joi.date()
    .required(),
  finishTime: Joi.date(),
  status: Joi.string()
    .required(),
  error: Joi.string(),
  errorStack: Joi.string(),
  duration: Joi.string(),
  migrationVersion: Joi.number(),
};

module.exports = obj => Joi.validate(obj, schema, { allowUnknown: false });
