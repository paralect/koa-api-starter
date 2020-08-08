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
  )
});


async function validator(ctx, next) {

  const idExist = await writerService.exists({
    _id: ctx.params._id
  });

  if (!idExist) {
    ctx.body = {
      errors: {
        email: ['Writer with this id is not exist'],
      },
    };
    ctx.throw(400);
  }
  await next();
}

async function handler(ctx) {
  let { writers } = ctx.state;
  const data = ctx.validatedData;
  writers = await writerService.update(
    { _id: ctx.params._id },
    (old) => ({ ...old, ...data }),
  );
  ctx.body = writers;
}

module.exports.register = (router) => {
  router.put('/update/:_id', validate(schema), validator, handler);
};