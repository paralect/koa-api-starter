// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'securityUt... Remove this comment to see the full error message
const securityUtil = require('security.util');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'authServic... Remove this comment to see the full error message
const authService = require('services/auth/auth.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
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
  const { email, password } = ctx.validatedData;

  const user = await userService.findOne({ email });

  ctx.assertClientError(user, {
    credentials: 'The email or password you have entered is invalid',
  });

  const isPasswordMatch = await securityUtil.compareTextWithHash(password, user.passwordHash);
  ctx.assertClientError(isPasswordMatch, {
    credentials: 'The email or password you have entered is invalid',
  });

  ctx.assertClientError(user.isEmailVerified, {
    email: 'Please verify your email to sign in',
  });

  ctx.validatedData.user = user;

  await next();
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handler'.
async function handler(ctx: $TSFixMe) {
  const { user } = ctx.validatedData;

  await Promise.all([
    userService.updateLastRequest(user._id),
    authService.setTokens(ctx, user._id),
  ]);

  ctx.body = userService.getPublic(user);
}

module.exports.register = (router: $TSFixMe) => {
  router.post('/sign-in', validate(schema), validator, handler);
};
