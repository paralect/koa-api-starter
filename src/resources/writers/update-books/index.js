const writerService = require('../writers.service');

async function updateHandler(ctx) {
  const newData = await writerService.update({ _id: ctx.params.id }, (doc) => ({...doc, ...ctx.data.concat(doc.books)}));
  ctx.body = newData;
}

async function deleteHandler(ctx) {
  const writer = await writerService.findOne({ _id: ctx.params.id });
  const bookIndex = writer.books.findIndex((el) => el._id === ctx.request.body.bookId);
  writer.books.splice(bookIndex, 1);
  ctx.body = await writerService.update({ _id: ctx.params.id }, () => ({ ...writer }));
}

async function changeHandler(ctx) {
  const newData = await writerService.update({ _id: ctx.params.id }, (doc) => ({...doc, ...ctx.data}));
  ctx.body = newData;
}

module.exports.register = (router) => {
  router.put('/books/:id', updateHandler);
  router.delete('/books/:id', deleteHandler);
  router.post('/books/:id', changeHandler);
};
