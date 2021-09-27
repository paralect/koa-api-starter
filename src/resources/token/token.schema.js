import Joi from 'joi';

import { TOKEN_TYPES } from '../../app.constants.js';

const schema = Joi.object({
  _id: Joi.string(),
  createdOn: Joi.date(),
  updatedOn: Joi.date(),
  type: Joi.string()
    .valid(TOKEN_TYPES.ACCESS)
    .required(),
  value: Joi.string()
    .required(),
  userId: Joi.string()
    .required(),
  isShadow: Joi.boolean(),
});

export default (obj) => schema.validate(obj, { allowUnknown: false });
