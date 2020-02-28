const validate = require('middlewares/validate');
const authService = require('services/auth.service');
const userService = require('resources/user/user.service');

const validator = require('./validator');


/**
 * Sign in user
 * Loads user by email and compare password hashes
 */
const handler = async (ctx) => {
  const { userId } = ctx.validatedRequest.value;

  await Promise.all([
    userService.updateLastRequest(userId),
    authService.setTokens(ctx, userId),
  ]);
  ctx.body = userService.getPublic(ctx.state.user);
};

module.exports.register = (router) => {
  router.post('/signin', validate(validator), handler);
};
