// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'any.required': 'Token is required',
      'string.empty': 'Token is required',
    }),
  token: Joi.string()
    .required()
    .messages({
      'any.required': 'Token is required',
      'string.empty': 'Token is required',
    }),
});

async function validator(ctx: $TSFixMe) {
  const { email, token } = ctx.validatedData;

  const user = await userService.findOne({ resetPasswordToken: token });

  if (user) {
    ctx.redirect(`${config.webUrl}/reset-password?token=${token}`);
  } else {
    ctx.redirect(`${config.webUrl}/expire-token?email=${email}`);
  }
}

module.exports.register = (router: $TSFixMe) => {
  router.get('/verify-reset-token', validate(schema), validator);
};
