// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  version: Joi.number()
    .required(),
});

module.exports = (obj: $TSFixMe) => schema.validate(obj, { allowUnknown: false });
