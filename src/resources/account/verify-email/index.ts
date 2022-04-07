// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'authServic... Remove this comment to see the full error message
const authService = require('services/auth/auth.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'any.required': 'Token is required',
      'string.empty': 'Token is required',
    }),
});

async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const user = await userService.findOne({ signupToken: ctx.validatedData.token });

  ctx.assertError(user, 'Token is invalid');

  ctx.validatedData.userId = user._id;
  await next();
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handler'.
async function handler(ctx: $TSFixMe) {
  const { userId } = ctx.validatedData;

  await Promise.all([
    userService.updateOne(
      { _id: userId },
      (old: $TSFixMe) => ({
        ...old,
        isEmailVerified: true,
        signupToken: null,
      }),
    ),
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);

  ctx.redirect(config.webUrl);
}

module.exports.register = (router: $TSFixMe) => {
  router.get('/verify-email', validate(schema), validator, handler);
};
