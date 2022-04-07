// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tokenServi... Remove this comment to see the full error message
const tokenService = require('resources/token/token.service');
const cookieHelper = require('./auth.helper');

exports.setTokens = async (ctx: $TSFixMe, userId: $TSFixMe) => {
  const res = await tokenService.createAuthTokens({ userId });

  const options = {
    ctx,
    ...res,
  };

  cookieHelper.setTokenCookies(options);
};

exports.unsetTokens = async (ctx: $TSFixMe) => {
  await tokenService.removeAuthTokens(ctx.state.accessToken, ctx.state.refreshToken);
  cookieHelper.unsetTokenCookies(ctx);
};
