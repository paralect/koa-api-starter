const _ = require('lodash');

const db = require('db');
const kafka = require('kafka');
const NodeMongoKafkaEmitter = require('node-mongo-kafka-emitter');

const constants = require('app.constants');

const { validate } = require('./user.schema');

const service = db.createService(
  constants.DATABASE_DOCUMENTS.USERS,
  { validate },
  new NodeMongoKafkaEmitter('user', kafka),
);

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

module.exports = service;
