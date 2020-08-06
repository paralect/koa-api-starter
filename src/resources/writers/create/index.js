const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('../writers.service');

const bookShema = Joi.object().keys({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  books: Joi.array().items(bookShema),
});

const writerHandler = async ({ request: { body }, response }) => {
  response.body = await writerService.create(body);
};

const bookHandler = async ({ params, response, request: { body } }) => {
  const userChanged = await writerService.update({ _id: params.id }, (old) => ({
    ...old,
    books: [...old.books, body],
  }));
  response.body = userChanged;
};

module.exports.register = (router) => {
  router.post('/', validate(schema), writerHandler);
  router.post('/:id/book', validate(bookShema), bookHandler);
};
