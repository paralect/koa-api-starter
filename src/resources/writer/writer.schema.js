const Joi = require('@hapi/joi');

const schema = Joi.object({
  _id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required(),
  createdOn: Joi.date().required(),
  books: [
    {
      _id: Joi.string().required(),
      title: Joi.string().required(),
      genre: Joi.string().required(),
    }
  ]
});

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
