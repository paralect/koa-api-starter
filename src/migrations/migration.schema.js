const Joi = require('joi');

const schema = {
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  version: Joi.number()
    .required(),
};

module.exports = (obj) => Joi.validate(obj, schema, { allowUnknown: false });
