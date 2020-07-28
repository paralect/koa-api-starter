const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const ENUM = ["novel", "poem", "fantasy"];

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
  age: Joi.number()
    .messages({
      'string.empty': 'Age is required',
    })
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
  const data = ctx.validatedData;
  console.log(data.firstName);

  await writerService.update({
    _id: Number(ctx.params.writerId)
  }, (doc) => {
    if (data.firstName) doc.firstName = data.firstName;
    if (data.lastName) doc.lastName = data.lastName;
    if (data.age) doc.age = data.age;
    return doc;
  });
}

module.exports.register = (router) => {
  router.put('/update/:writerId', validate(schema), validator, handler);
};
