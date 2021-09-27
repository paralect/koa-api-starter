import _ from 'lodash';

import db from '../../db.js';
import { DATABASE_DOCUMENTS } from '../../app.constants.js';

import validateSchema from './user.schema.js';

const service = db.createService(DATABASE_DOCUMENTS.USERS, { validate: validateSchema });

service.updateLastRequest = async (_id) => {
  return service.atomic.update({ _id }, {
    $set: {
      lastRequest: new Date(),
      updatedOn: new Date(),
    },
  });
};

const privateFields = [
  'passwordHash',
  'signupToken',
  'resetPasswordToken',
];

service.getPublic = (user) => {
  return _.omit(user, privateFields);
};

export default service;
