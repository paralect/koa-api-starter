const _ = require('lodash');

const db = require('db');
const constants = require('app.constants');

const validateSchema = require('./user.schema');

const service = db.createService(constants.DATABASE_DOCUMENTS.USERS, { validate: validateSchema });

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

service._find = service.find;
service.find = async (query = {}, options = {}) => {
  const { results, pagesCount, count } = await service._find(query, options);
  const users = results.map((user) => _.omit(user, privateFields));
  return { users, pagesCount, count };
};

service._findOne = service.findOne;
service.findOne = async (query = {}, options = {}) => {
  const user = await service._findOne(query, options);
  return _.omit(user, privateFields);
};

service._create = service.create;
service.create = async (data) => {
  const users = await service._create(data);
  return users.length
    ? users.map((user) => _.omit(user, privateFields))
    : _.omit(users, privateFields);
};

service._remove = service.remove;
service.remove = async (query = {}, options = {}) => {
  const users = await service._remove(query, options);
  return users.map((user) => _.omit(user, privateFields));
};

service._updateOne = service.updateOne;
service.updateOne = async (query = {}, updateFn = (doc) => doc, options = {}) => {
  const user = await service._updateOne(query, updateFn, options);
  return _.omit(user, privateFields);
};

service._updateMany = service.updateMany;
service.updateMany = async (query = {}, updateFn = (doc) => doc, options = {}) => {
  const users = await service._updateMany(query, updateFn, options);
  return users.map((user) => _.omit(user, privateFields));
};

module.exports = service;
