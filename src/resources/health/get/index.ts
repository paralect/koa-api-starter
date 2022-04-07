// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'handler'.
const handler = (ctx: $TSFixMe) => {
  ctx.status = 200;
};

module.exports.register = (router: $TSFixMe) => {
  router.get('/', handler);
};
