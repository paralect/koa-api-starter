// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .email()
    .required(),
  passwordHash: Joi.string()
    .allow(null),
  signupToken: Joi.string()
    .allow(null),
  resetPasswordToken: Joi.string()
    .allow(null),
  isEmailVerified: Joi.boolean()
    .default(false),
  lastRequest: Joi.date(),
  avatarUrl: Joi.string()
    .allow(null),
});

module.exports = (obj: $TSFixMe) => schema.validate(obj, { allowUnknown: false });
