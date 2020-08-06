const writerService = require('resources/writers/writers.service');
const validate = require('middlewares/validate');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  _id: Joi.string().required,
});

const writerHandler = async ({ request: { body }, response }) => {
  const id = body._id;
  const userChanged = await writerService.update({ _id: id }, (old) => ({
    ...old,
    ...body,
  }));
  response.body = userChanged;
};

const bookHandler = async ({ response, request: { body } }) => {
  const userChanged = await writerService.update({ _id: body._id }, (old) => ({
    ...old,
    books: [body.book],
  }));
  response.body = userChanged;
};

module.exports.register = (router) => {
  router.put('/', validate(schema), writerHandler);
  router.put('/books', validate(schema), bookHandler);
};
