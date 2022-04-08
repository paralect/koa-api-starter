import tokenService from 'resources/token/token.service';
import cookieHelper from './auth.helper';

const setTokens = async (ctx: $TSFixMe, userId: $TSFixMe) => {
  const res = await tokenService.createAuthTokens({ userId });

  const options = {
    ctx,
    ...res,
  };

  cookieHelper.setTokenCookies(options);
};

const unsetTokens = async (ctx: $TSFixMe) => {
  await tokenService.removeAuthTokens(ctx.state.accessToken, ctx.state.refreshToken);
  cookieHelper.unsetTokenCookies(ctx);
};

export default {
  setTokens,
  unsetTokens,
};
