const writerService = require('../writers.service');

async function handler(ctx) {
  const arr = ctx.url.split('/');
  const id = arr[arr.length-1];
  await writerService.update(id, (doc) => doc.books.push(ctx.request.body))
  ctx.body = await writerService.find(id);
}

module.exports.register = (router) => {
  router.put('/addbook:id', handler);
};
