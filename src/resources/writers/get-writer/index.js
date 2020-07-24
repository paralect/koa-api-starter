const writerService = require('../writers.service');

async function handler(ctx) {
  let id  = ctx.request.body;
  ctx.body = await writerService.find(id);
}
module.exports.register = (router) => {
  router.post('/getwriter', handler);
};
