const userService = require('resources/user/user.service');
const tokenService = require('resources/token/token.service');

const tryToAttachUser = async (ctx, next) => {
  if (!ctx.state.accessToken) {
    return next();
  }

  const userId = await tokenService.getUserIdByToken(ctx.state.accessToken);

  if (!userId) {
    return next();
  }

  ctx.state.user = await userService.findById(userId);
  return next();
};

module.exports = tryToAttachUser;
