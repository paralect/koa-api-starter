const config = require('config');
const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');
const authService = require('services/auth.service');

const validator = require('./validator');


/**
 * Verify user's email when user click a link from email
 */
const handler = async (ctx) => {
  const { userId } = ctx.validatedRequest.value;

  await Promise.all([
    userService.update(
      { _id: userId },
      {
        $set: {
          isEmailVerified: true,
        },
        $unset: {
          signupToken: 1,
        },
      },
    ),
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);

  ctx.redirect(config.webUrl);
};

module.exports.register = (router) => {
  router.get('/verifyEmail/:token', validate(validator), handler);
};
