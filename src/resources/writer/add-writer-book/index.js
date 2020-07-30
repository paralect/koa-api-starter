const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUM = ["novel", "poem", "fantasy"];

const schema = Joi.object({
  _id: Joi.number().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid(...ENUM),
});

async function validator(ctx, next) {
  const isWriterExists = await writerService.exists({
    _id: +ctx.params.id
  });

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
  const data = ctx.validatedData;
  ctx.body = await writerService.update({ _id: +ctx.params.id }, (doc) => {
    console.log(data);
    doc.books.push(data);
    return doc;
  });
}

module.exports.register = (router) => {
  router.put('/:id', validate(schema), validator, handler);
};
