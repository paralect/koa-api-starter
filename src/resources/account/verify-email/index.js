const Joi = require('joi');

const config = require('config');
const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');
const authService = require('services/auth.service');

const schema = Joi.object({
  token: Joi.string()
    .required()
    .messages({
      'any.required': 'Token is required',
      'string.empty': 'Token is required',
    }),
});

async function validator(ctx, next) {
  const user = await userService.findOne({ signupToken: ctx.validatedData.token });

  if (!user) {
    ctx.body = {
      errors: {
        token: ['Token is invalid'],
      },
    };
    ctx.throw(400);
  }

  ctx.validatedData.userId = user._id;

  await next();
}

async function handler(ctx) {
  const { userId } = ctx.validatedData;

  await Promise.all([
    userService.update(
      { _id: userId },
      (old) => ({ ...old, isEmailVerified: true, signupToken: null }),
    ),
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);

  ctx.redirect(config.webUrl);
}

module.exports.register = (router) => {
  router.get('/verify-email', validate(schema), validator, handler);
};
