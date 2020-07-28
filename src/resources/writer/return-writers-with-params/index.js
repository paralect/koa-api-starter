const Joi = require('@hapi/joi');

const writerService = require('resources/writer/writer.service');

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
  router.post('/:pageNumber/:documentsInPage/:sortBy/:sortOrder', validator, handler);
};
