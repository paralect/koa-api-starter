const Joi = require('joi');

const schema = {
  _id: Joi.string(),
  version: Joi.number(),
};

module.exports = obj => Joi.validate(obj, schema, { allowUnknown: false });
