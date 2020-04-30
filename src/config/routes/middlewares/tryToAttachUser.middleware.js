const authService = require('services/auth.service');

const userService = require('resources/user/user.service');
const tokenService = require('resources/token/token.service');

const tryToAttachUser = async (ctx, next) => {
  let userId;

  if (ctx.state.accessToken) {
    userId = await tokenService.getUserIdByToken(ctx.state.accessToken);
  }

  if (!userId && ctx.state.refreshToken) {
    userId = await tokenService.getUserIdByToken(ctx.state.refreshToken);
    if (userId) await authService.setTokens(ctx, userId);
  }

  if (userId) {
    ctx.state.user = await userService.findOneAndUpdate(
      { _id: userId },
      {
        $set: { lastRequest: new Date() },
      },
    );
  }

  return next();
};

module.exports = tryToAttachUser;
