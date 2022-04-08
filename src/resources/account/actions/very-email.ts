import Joi from 'joi';
import validate from 'middlewares/validate.middleware';
import userService from 'resources/user/user.service';
import authService from 'services/auth/auth.service';
import config from 'config';

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
  if (!user) {
    ctx.status = 404;
    return;
  }

  ctx.assertError(user, 'Token is invalid');

  ctx.validatedData.userId = user._id;
  await next();
}

async function handler(ctx: $TSFixMe) {
  const { userId } = ctx.validatedData;

  await Promise.all([
    userService.update({ _id: userId }, () => ({
      isEmailVerified: true,
      signupToken: null,
    })),
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);

  ctx.redirect(config.webUrl);
}

export default (router: $TSFixMe) => {
  router.get('/verify-email', validate(schema), validator, handler);
};
