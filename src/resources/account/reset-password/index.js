const Joi = require('joi');

const securityUtil = require('security.util');
const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');

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

async function handler(ctx) {
  const { token, password } = ctx.validatedData;

  const user = await userService.findOne({ resetPasswordToken: token });
  if (!user) {
    ctx.body = {
      errors: {
        token: ['Password reset link has expired or invalid'],
      },
    };
    ctx.throw(400);
  }

  const passwordHash = await securityUtil.getHash(password);
  await userService.update(
    { _id: user._id },
    (old) => ({ ...old, passwordHash, resetPasswordToken: null }),
  );

  ctx.body = {};
}

module.exports.register = (router) => {
  router.put('/reset-password', validate(schema), handler);
};
