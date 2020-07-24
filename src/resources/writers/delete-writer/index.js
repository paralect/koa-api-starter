const writerService = require('../writers.service');

async function handler(ctx) {
  const arr = ctx.url.split('/');
  const id = arr[arr.length-1];
  await writerService.remove({"_id": id});
  ctx.body = 'Writer was deleted';
}

module.exports.register = (router) => {
  router.delete('/deletewriter/:id', handler);
};
