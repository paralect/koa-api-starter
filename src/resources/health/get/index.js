const handler = (ctx) => {
  ctx.status = 200;
};

export default (router) => {
  router.get('/', handler);
};
