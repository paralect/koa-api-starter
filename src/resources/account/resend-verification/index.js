import Joi from 'joi';

import * as emailService from '../../../services/email.service.js';
import validate from '../../../middlewares/validate.js';
import userService from '../../user/user.service.js';

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
  const { email } = ctx.validatedData;
  const user = await userService.findOne({ email });

  if (user) {
    await emailService.sendSignupWelcome({
      email,
      signupToken: user.signupToken,
    });
  }

  ctx.body = {};
}

export default (router) => {
  router.post('/resend', validate(schema), handler);
};
