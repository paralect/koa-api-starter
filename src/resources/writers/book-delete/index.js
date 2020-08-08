const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writers/writers.service');

const schema = Joi.object({
  title: Joi.string(),
  genre: Joi.string().valid('poem', 'novel'),
});

async function handler(ctx) {
  let book = ctx.request.body;
  ctx.body = await writerService.update(
    { _id: ctx.params.id },
    { $pull: { books: { book } } },
  );
}

module.exports.register = (router) => {
  router.delete('/books-delete/:id', validate(schema), handler);
};