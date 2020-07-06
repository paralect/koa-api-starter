const Joi = require('@hapi/joi');

const schema = Joi.object({
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  version: Joi.number()
    .required(),
});

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
