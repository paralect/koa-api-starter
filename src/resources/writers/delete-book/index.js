const writerService = require('../writers.service');

async function handler(ctx) {
  const arr = ctx.url.split('/');
  const id = arr[arr.length-1];
  await writerService.remove({id});
  ctx.body = await writerService.find(id);
}

module.exports.register = (router) => {
  router.delete('/deletebook:id', handler);
};
