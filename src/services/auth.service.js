import tokenService from '../resources/token/token.service.js';
import * as cookieHelper from '../helpers/cookie.helper.js';

export const setTokens = async (ctx, userId) => {
  const res = await tokenService.createAuthTokens({ userId });

  const options = {
    ctx,
    ...res,
  };

  cookieHelper.setTokenCookies(options);
};

export const unsetTokens = async (ctx) => {
  await tokenService.removeAuthTokens(ctx.state.accessToken, ctx.state.refreshToken);
  cookieHelper.unsetTokenCookies(ctx);
};
