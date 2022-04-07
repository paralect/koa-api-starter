// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'securityUt... Remove this comment to see the full error message
const securityUtil = require('security.util');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  password: Joi.string()
    .trim()
    .min(6)
    .max(50)
    .messages({
      'any.required': 'Password is required',
      'string.empty': 'Password is required',
      'string.min': 'Password must be 6-50 characters',
      'string.max': 'Password must be 6-50 characters',
    }),
});

async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const { user } = ctx.state;
  const { password } = ctx.validatedData;

  const isPasswordMatch = await securityUtil.compareTextWithHash(password, user.passwordHash);
  ctx.assertClientError(!isPasswordMatch, {
    password: 'The new password should be different from the previous one',
  });

  await next();
}

async function handler(ctx: $TSFixMe) {
  const { user } = ctx.state;
  const { password } = ctx.validatedData;

  const passwordHash = await securityUtil.getHash(password);

  const updatedUser = await userService.updateOne(
    { _id: user._id },
    (old: $TSFixMe) => ({
      ...old,
      passwordHash,
    }),
  );

  ctx.body = userService.getPublic(updatedUser);
}

module.exports.register = (router: $TSFixMe) => {
  router.post('/current', validate(schema), validator, handler);
};
