const validate = require('middlewares/validate');
const securityUtil = require('security.util');
const userService = require('resources/user/user.service');
const emailService = require('services/email.service');

const validator = require('./validator');


/**
 * Send forgot password email with a unique link to set new password
 * If user is found by email - sends forgot password email and update
 * `forgotPasswordToken` field. If user not found, returns validator's error
 */
const handler = async (ctx) => {
  const data = ctx.validatedRequest.value;
  const user = await userService.findOne({ email: data.email });

  if (user) {
    let { resetPasswordToken } = user;

    if (!resetPasswordToken) {
      resetPasswordToken = await securityUtil.generateSecureToken();
      await userService.update(
        { _id: user._id },
        {
          $set: {
            resetPasswordToken,
          },
        },
      );
    }

    await emailService.sendForgotPassword({
      email: user.email,
      firstName: user.firstName,
      resetPasswordToken,
    });
  }

  ctx.body = {};
};

module.exports.register = (router) => {
  router.post('/forgotPassword', validate(validator), handler);
};
