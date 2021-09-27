import * as authService from '../../../services/auth.service.js';

/**
 * Remove tokens for the user and logout
 */
const handler = async (ctx) => {
  await authService.unsetTokens(ctx);
  ctx.body = {};
};

export default (router) => {
  router.post('/logout', handler);
};
