import Joi from 'joi';

import validate from '../../../middlewares/validate.js';
import * as securityUtil from '../../../security.util.js';
import userService from '../../user/user.service.js';
import * as emailService from '../../../services/email.service.js';

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

async function handler(ctx) {
  const user = await userService.findOne({ email: ctx.validatedData.email });

  if (user) {
    let { resetPasswordToken } = user;

    if (!resetPasswordToken) {
      resetPasswordToken = await securityUtil.generateSecureToken();
      await userService.updateOne(
        { _id: user._id },
        (old) => ({ ...old, resetPasswordToken }),
      );
    }

    await emailService.sendForgotPassword({
      email: user.email,
      firstName: user.firstName,
      resetPasswordToken,
    });
  }

  ctx.body = {};
}

export default (router) => {
  router.post('/forgot-password', validate(schema), handler);
};
