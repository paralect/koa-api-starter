// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'securityUt... Remove this comment to see the full error message
const securityUtil = require('security.util');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'any.required': 'Token is required',
      'string.empty': 'Token is required',
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
  const { token } = ctx.validatedData;

  const user = await userService.findOne({ resetPasswordToken: token });

  if (!user) {
    ctx.body = {};
    return;
  }

  ctx.validatedData.user = user;
  await next();
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handler'.
async function handler(ctx: $TSFixMe) {
  const { user, password } = ctx.validatedData;

  const passwordHash = await securityUtil.getHash(password);

  await userService.updateOne(
    { _id: user._id },
    (old: $TSFixMe) => ({
      ...old,
      passwordHash,
      resetPasswordToken: null,
    }),
  );

  ctx.body = {};
}

module.exports.register = (router: $TSFixMe) => {
  router.put('/reset-password', validate(schema), validator, handler);
};
