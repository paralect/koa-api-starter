// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'emailServi... Remove this comment to see the full error message
const emailService = require('services/email/email.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'securityUt... Remove this comment to see the full error message
const securityUtil = require('security.util');

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
});

// @ts-expect-error ts-migrate(2393) FIXME: Duplicate function implementation.
async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const { email } = ctx.validatedData;

  const user = await userService.findOne({ email });

  if (!user) {
    ctx.body = {};
    return;
  }

  ctx.validatedData.user = user;
  await next();
}

// @ts-expect-error ts-migrate(2393) FIXME: Duplicate function implementation.
async function handler(ctx: $TSFixMe) {
  const { user } = ctx.validatedData;

  const resetPasswordToken = await securityUtil.generateSecureToken();

  await Promise.all([
    userService.updateOne(
      { _id: user._id },
      (old: $TSFixMe) => ({
        ...old,
        resetPasswordToken,
      }),
    ),
    emailService.sendForgotPassword({
      email: user.email,
      resetPasswordToken,
    }),
  ]);

  ctx.body = {};
}

module.exports.register = (router: $TSFixMe) => {
  router.post('/resend-email', validate(schema), validator, handler);
};
