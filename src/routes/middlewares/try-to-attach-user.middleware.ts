import userService from 'resources/user/user.service';
import tokenService from 'resources/token/token.service';

const tryToAttachUser = async (ctx: $TSFixMe, next: $TSFixMe) => {
  let userData;

  if (ctx.state.accessToken) {
    userData = await tokenService.findTokenByValue(ctx.state.accessToken);
  }

  if (userData) {
    await userService.updateLastRequest(userData.userId);
    ctx.state.user = await userService.findOne({ _id: userData.userId });
  }

  return next();
};

export default tryToAttachUser;
