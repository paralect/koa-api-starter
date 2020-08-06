const Joi = require('@hapi/joi');

const books = Joi.object().keys({
  id: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  createdOn: Joi.date(),
  books: Joi.array().items(books),
});

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
