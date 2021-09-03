async function handler(ctx) {
  ctx.body = ctx.state.user;
}

module.exports.register = (router) => {
  router.get('/current', handler);
};
