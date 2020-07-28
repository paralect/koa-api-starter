const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUM = ["novel", "poem", "fantasy"];

const schema = Joi.object({
  books: Joi.array().items(
    Joi.object({
      _id: Joi.number().required(),
      title: Joi.string().required(),
      genre: Joi.string().valid(...ENUM),
    })
  )
});

async function validator(ctx, next) {
  const isWriterExists = await writerService.exists({
    _id: Number(ctx.params.writerId)
  });

  console.log(isWriterExists);

  if (!isWriterExists) {
    ctx.body = {
      errors: {
        _global: ['This writer is not exists'],
      },
    };
    ctx.throw(400);
  }

  await next();
}

async function handler(ctx) {
  ctx.body = await writerService.update({ _id: Number(ctx.params.writerId) }, (doc) => {
    doc.books = ctx.request.body.books;
    return doc;
  }
  );
}

module.exports.register = (router) => {
  router.put('/:writerId/book', validate(schema), validator, handler);
};
