import Joi from 'joi';
import validate from 'middlewares/validate.middleware';
import userService from 'resources/user/user.service';
import { securityUtil } from 'utils';

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

  const updatedUser = await userService.update({ _id: user._id }, () => ({ passwordHash }));

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: $TSFixMe) => {
  router.post('/current', validate(schema), validator, handler);
};
