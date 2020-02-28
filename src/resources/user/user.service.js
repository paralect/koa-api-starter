const _ = require('lodash');
const { streamable } = require('@paralect/node-mongo');

const db = require('db');
const constants = require('app.constants');

const schema = require('./user.schema');


const service = streamable(db.createService(constants.DATABASE_DOCUMENTS.USERS, schema));

service.updateLastRequest = async (_id) => {
  return service.update(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );
};

const privateFields = [
  'passwordHash',
  'signupToken',
  'resetPasswordToken',
];

service.getPublic = (user) => {
  return _.omit(user, privateFields);
};

module.exports = service;
