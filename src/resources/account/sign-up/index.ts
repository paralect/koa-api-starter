// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'securityUt... Remove this comment to see the full error message
const securityUtil = require('security.util');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'emailServi... Remove this comment to see the full error message
const emailService = require('services/email/email.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'First name is required',
      'string.empty': 'First name is required',
    }),
  lastName: Joi.string()
    .trim()
    .required()
    .messages({
      'any.required': 'Last name is required',
      'string.empty': 'Last name is required',
    }),
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      'any.required': 'Email is required',
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email address',
    }),
  password: Joi.string()
    .trim()
    .min(6)
    .max(50)
    .required()
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'string.min': 'Password must be 6-50 characters',
      'string.max': 'Password must be 6-50 characters',
    }),
});

async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });
  ctx.assertClientError(!isUserExists, {
    email: 'User with this email is already registered',
  });

  await next();
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handler'.
async function handler(ctx: $TSFixMe) {
  const {
    firstName,
    lastName,
    email,
    password,
  } = ctx.validatedData;

  const [hash, signupToken] = await Promise.all([
    securityUtil.getHash(password),
    securityUtil.generateSecureToken(),
  ]);

  const user = await userService.create({
    firstName,
    lastName,
    email,
    passwordHash: hash.toString(),
    isEmailVerified: false,
    signupToken,
  });

  await emailService.sendSignUpWelcome(
    user.email,
    {
      verifyEmailUrl: `${config.apiUrl}/account/verify-email?token=${signupToken}`,
    },
  );

  ctx.body = config.isDev ? { signupToken } : {};
}

module.exports.register = (router: $TSFixMe) => {
  router.post('/sign-up', validate(schema), validator, handler);
};
