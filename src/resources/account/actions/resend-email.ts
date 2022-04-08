import Joi from 'joi';
import validate from 'middlewares/validate.middleware';
import securityUtil from 'utils/security.util';
import userService from 'resources/user/user.service';
import emailService from 'services/email/email.service';

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
  const { email } = ctx.validatedData;

  const user = await userService.findOne({ email });

  if (!user) {
    ctx.body = {};
    return;
  }

  ctx.validatedData.user = user;
  await next();
}

async function handler(ctx: $TSFixMe) {
  const { user } = ctx.validatedData;

  const resetPasswordToken = await securityUtil.generateSecureToken();

  await Promise.all([
    userService.update({ _id: user._id }, () => ({ resetPasswordToken })),
    emailService.sendForgotPassword(user.email, {
      email: user.email,
      resetPasswordToken,
    }),
  ]);

  ctx.body = {};
}

export default (router: $TSFixMe) => {
  router.post('/resend-email', validate(schema), validator, handler);
};
