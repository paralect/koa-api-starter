const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');

async function validator(ctx, next) {
  console.log("sdfdsfsdf");
  const isWriterExists = await writerService.exists({
    _id: Number(ctx.params.writerId)
  });
  const isBookExists = await writerService.exists({
    "books._id": Number(ctx.params.bookId)
  });

  console.log(isBookExists);
  console.log(isWriterExists);

  if (!isWriterExists) {
    ctx.body = {
      errors: {
        _global: ['This writer is not exists'],
      },
    };
    ctx.throw(400);
  }

  if (!isBookExists) {
    ctx.body = {
      errors: {
        _global: ['This book is not exists'],
      },
    };
    ctx.throw(400);
  }

  await next();
}

async function handler(ctx) {
  const data = ctx.validatedData;
  ctx.body = await writerService.update({ _id: Number(ctx.params.writerId) }, (doc) => {
    console.log(doc.books)
    doc.books = doc.books.filter(book =>
      !(book._id === Number(ctx.params.bookId))
    );
    return doc;
  }
  );
}

module.exports.register = (router) => {
  router.delete('/:writerId/book/:bookId', validator, handler);
};
