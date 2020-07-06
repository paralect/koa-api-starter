const Joi = require('joi');

const userSchema = {
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .required(),
  passwordHash: Joi.string()
    .allow(null),
  signupToken: Joi.string()
    .allow(null),
  resetPasswordToken: Joi.string()
    .allow(null),
  isEmailVerified: Joi.boolean()
    .default(false),
  oauth: Joi.object()
    .keys({
      google: Joi.boolean().default(false),
    })
    .required(),
  lastRequest: Joi.date(),
};

module.exports = (obj) => Joi.validate(obj, userSchema, { allowUnknown: false });
