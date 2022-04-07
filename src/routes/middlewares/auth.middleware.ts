// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auth'.
const auth = (ctx: $TSFixMe, next: $TSFixMe) => {
  if (ctx.state.user) {
    return next();
  }

  ctx.status = 401;
  ctx.body = {};
  return null;
};

module.exports = auth;
