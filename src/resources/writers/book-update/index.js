const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const writerService = require('resources/writers/writers.service');

const schema = Joi.object({
  title: Joi.string(),
  genre: Joi.string().valid('poem', 'novel'),
});

async function handler(ctx) {
  let { updateData } = ctx.state;
  const data = ctx.validatedData;
  updateData = await writerService.update(
    { _id: ctx.params.id },
    (old) => ({ ...old, ...data }),
  );
  ctx.body = updateData;
}

(old) => ({ ...old, ...data }),

  module.exports.register = (router) => {
    router.put('/books-update/:id', validate(schema), handler);
  };