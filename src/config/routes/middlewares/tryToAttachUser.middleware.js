import userService from '../../../resources/user/user.service.js';
import tokenService from '../../../resources/token/token.service.js';

const tryToAttachUser = async (ctx, next) => {
  let userData;

  if (ctx.state.accessToken) {
    userData = await tokenService.getUserDataByToken(ctx.state.accessToken);
  }

  if (userData) {
    await userService.updateLastRequest(userData.userId);
    ctx.state.user = await userService.findOne({ _id: userData.userId });
    ctx.state.isShadow = userData.isShadow;
  }

  return next();
};

export default tryToAttachUser;
