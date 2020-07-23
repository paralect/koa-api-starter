const Joi = require('@hapi/joi');

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

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
