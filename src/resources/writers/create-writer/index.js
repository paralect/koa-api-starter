const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('../writers.service');

const schema = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  age: Joi.number(),
  createdOn: Joi.date(),
  books: Joi.array()
    .items({
      _id: Joi.string(),
      title: Joi.string(),
      genre: Joi.string()
        .valid('novel', 'poem'),
    })
});

async function handler(ctx) {
  let writer  = ctx.request.body;
  await writerService.create(writer);
  ctx.body = await writerService.find({});
}

module.exports.register = (router) => {
  router.post('/createwriter', validate(schema), handler);
};
