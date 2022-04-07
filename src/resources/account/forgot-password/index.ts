import Joi from 'joi';
import validate from 'middlewares/validate.middleware';
import securityUtil from 'security.util';


// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'emailServi... Remove this comment to see the full error message
const emailService = require('services/email/email.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');

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

async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const user = await userService.findOne({ email: ctx.validatedData.email });

  if (!user) {
    ctx.body = {};
    return;
  }

  ctx.validatedData.user = user;
  await next();
}

async function handler(ctx: $TSFixMe) {
  const { user } = ctx.validatedData;

  let { resetPasswordToken } = user;

  if (!resetPasswordToken) {
    resetPasswordToken = await securityUtil.generateSecureToken();
    await userService.updateOne(
      { _id: user._id },
      (old: $TSFixMe) => ({
        ...old,
        resetPasswordToken,
      }),
    );
  }

  await emailService.sendForgotPassword(
    user.email,
    {
      firstName: user.firstName,
      resetPasswordUrl: `${config.apiUrl}/account/verify-reset-token?token=${resetPasswordToken}&email=${user.email}`,
    },
  );

  ctx.body = {};
}

module.exports.register = (router: $TSFixMe) => {
  router.post('/forgot-password', validate(schema), validator, handler);
};
