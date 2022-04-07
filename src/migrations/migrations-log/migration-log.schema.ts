// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  startTime: Joi.date()
    .required(),
  finishTime: Joi.date(),
  status: Joi.string()
    .required(),
  error: Joi.string(),
  errorStack: Joi.string(),
  duration: Joi.string(),
  migrationVersion: Joi.number()
    .required(),
});

module.exports = (obj: $TSFixMe) => schema.validate(obj, { allowUnknown: false });
