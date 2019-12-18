const tokenService = require('resources/token/token.service');
const authService = require('services/auth.service');


/**
 * Allows to get updated access token and update refresh token
 */
const handler = async (ctx) => {
  const userId = await tokenService.getUserIdByToken(ctx.state.refreshToken);

  if (!userId) {
    ctx.status = 401;
    ctx.body = {};
    return;
  }

  await authService.setTokens(ctx, userId);
  ctx.body = {};
};

module.exports.register = (router) => {
  router.post('/refresh-token', handler);
};
