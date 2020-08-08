const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writers/writers.service');

const schema = Joi.object({
  firstName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'First name is required',
    }),
  lastName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'Last name is required',
    }),
  age: Joi.string()
    .trim()
    .messages({
      'string.empty': 'Age is required',
    }),
  books: Joi.array().items(
    Joi.object({
      id: Joi.number().required(),
      title: Joi.string().required(),
      genre: Joi.string().valid('poem', 'novel'),
    }),
  ),
});


async function handler(ctx) {
  ctx.body = await writerService.writeDB(ctx.request.body);
}

module.exports.register = (router) => {
  router.post('/create', handler, validate(schema));
};

