// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'authServic... Remove this comment to see the full error message
const authService = require('services/auth/auth.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handler'.
const handler = async (ctx: $TSFixMe) => {
  await authService.unsetTokens(ctx);
  ctx.body = {};
};

module.exports.register = (router: $TSFixMe) => {
  router.post('/sign-out', handler);
};
