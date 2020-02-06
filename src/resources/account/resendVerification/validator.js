const Joi = require('helpers/joi.adapter');


const schema = {
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .trim()
    .lowercase()
    .required()
    .options({
      language: {
        any: { empty: '!!Email is required' },
        string: { email: '!!Please enter a valid email address' },
      },
    }),
};

const validateFunc = async (data) => {
  const errors = [];

  return {
    value: data,
    errors,
  };
};

module.exports = [
  Joi.validate(schema),
  validateFunc,
];
