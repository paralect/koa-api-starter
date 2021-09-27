import Joi from 'joi';

import * as securityUtil from '../../../security.util.js';
import validate from '../../../middlewares/validate.js';
import userService from '../../user/user.service.js';

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
  ctx.assertError(!user, {
    token: ['Password reset link has expired or invalid'],
  });

  const passwordHash = await securityUtil.getHash(password);
  await userService.updateOne(
    { _id: user._id },
    (old) => ({ ...old, passwordHash, resetPasswordToken: null }),
  );

  ctx.body = {};
}

export default (router) => {
  router.put('/reset-password', validate(schema), handler);
};
