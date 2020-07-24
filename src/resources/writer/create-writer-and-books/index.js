const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUM = ["novel", "poem", "fantasy"];

const schema = Joi.object({
  _id: Joi.number().required(),
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
  age: Joi.number()
    .messages({
      'string.empty': 'Age is required',
    }),
  books: Joi.array().items(
    Joi.object({
      _id: Joi.number().required(),
      title: Joi.string().required(),
      genre: Joi.string().valid(...ENUM),
    })
  )
});

async function validator(ctx, next) {
  const { firstName, lastName } = ctx.validatedData;
  console.log(ctx.validatedData);
  console.log(firstName, lastName);

  const isWriterExists = await writerService.exists({
    firstName,
    lastName,
  });

  if (isWriterExists) {
    ctx.body = {
      errors: {
        _global: ['This writer is already exists'],
      },
    };
    ctx.throw(400);
  }

  await next();
}

async function handler(ctx) {
  const data = ctx.validatedData;
  console.log(data);

  await writerService.create({
    _id: data._id,
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    books: data.books,
  });
}

module.exports.register = (router) => {
  router.post('/', validate(schema), validator, handler);
};
