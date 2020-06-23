const userService = require('resources/user/user.service');
const tokenService = require('resources/token/token.service');

const tryToAttachUser = async (ctx, next) => {
  let userData;

  if (ctx.state.accessToken) {
    userData = await tokenService.getUserDataByToken(ctx.state.accessToken);
  }

  if (userData) {
    ctx.state.user = await userService.findOneAndUpdate({ _id: userData.userId }, {
      $set: { lastRequest: new Date() },
    });
    ctx.state.isShadow = userData.isShadow;
  }

  return next();
};

module.exports = tryToAttachUser;
