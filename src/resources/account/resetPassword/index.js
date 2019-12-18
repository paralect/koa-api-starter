const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');

const validator = require('./validator');


/**
 * Updates user password, used in combination with forgotPassword
 */
const handler = async (ctx) => {
  const { userId, password } = ctx.validatedRequest.value;

  await userService.updatePassword(userId, password);
  await userService.updateResetPasswordToken(userId, '');

  ctx.body = {};
};

module.exports.register = (router) => {
  router.put('/resetPassword', validate(validator), handler);
};
