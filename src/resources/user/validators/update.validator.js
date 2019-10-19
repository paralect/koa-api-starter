const Joi = require('helpers/joi.adapter');
const userService = require('resources/user/user.service');


const emailInUseMessage = 'This email is already in use.';

const schema = {
  firstName: Joi.string()
    .trim()
    .options({
      language: {
        any: { empty: '!!Your first name must be longer than 1 letter' },
      },
    }),
  lastName: Joi.string()
    .trim()
    .options({
      language: {
        any: { empty: '!!Your last name must be longer than 1 letter' },
      },
    }),
  email: Joi.string()
    .email({ minDomainAtoms: 2 })
    .trim()
    .lowercase()
    .options({
      language: {
        string: { email: '!!Please enter a valid email address' },
        any: { empty: '!!Email is required' },
      },
    }),
};

const validateFunc = async (data, persistentData) => {
  const errors = [];

  const isEmailInUse = await userService.exists({
    _id: { $ne: persistentData.state.user._id },
    email: data.email,
  });

  if (isEmailInUse) {
    errors.push({ email: emailInUseMessage });
    return {
      errors,
    };
  }

  return {
    value: data,
    errors,
  };
};

module.exports = [
  Joi.validate(schema),
  validateFunc,
];
