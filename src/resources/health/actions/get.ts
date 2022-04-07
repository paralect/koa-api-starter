const handler = (ctx: $TSFixMe) => {
  ctx.status = 200;
};

export default (router: $TSFixMe) => {
  router.get('/', handler);
};
