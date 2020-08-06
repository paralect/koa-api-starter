const writerService = require('resources/writers/writers.service');
const validate = require('middlewares/validate');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  _id: Joi.string(),
});

const handler = async ({
  request: {
    body: { _id },
  },
}) => {
  await writerService.remove({ _id });
};

const bookHandler = async ({ params, response, request: { body } }) => {
  const { books } = await writerService.findOne({ _id: params.id });
  const newBooks = books.filter((book) => book._id !== body._id);
  const userChanged = await writerService.update({ _id: params.id }, (old) => ({
    ...old,
    books: newBooks,
  }));
  response.body = userChanged;
};

module.exports.register = (router) => {
  router.delete('/', validate(schema), handler);
  router.delete('/:id/book', validate(schema), bookHandler);
};
