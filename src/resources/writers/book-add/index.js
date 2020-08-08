const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writers/writers.service');

const schema = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().valid('poem', 'novel'),
});

async function handler(ctx) {
  const book = ctx.request.body;

  ctx.body = await writerService.update(
    { _id: ctx.params.id },
    { $push: { books: book } }
  )
}

module.exports.register = (router) => {
   router.post('/books/:id', validate(schema), handler);
};

