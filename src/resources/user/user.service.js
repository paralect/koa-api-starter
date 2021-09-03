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
  const { results, ...data } = await service._find(query, options);
  const items = results.map((item) => _.omit(item, privateFields));
  return { results: items, ...data };
};

service._findOne = service.findOne;
service.findOne = async (query = {}, options = {}) => {
  const item = await service._findOne(query, options);
  return _.omit(item, privateFields);
};

service._create = service.create;
service.create = async (data) => {
  const items = await service._create(data);
  return items.length
    ? items.map((item) => _.omit(item, privateFields))
    : _.omit(items, privateFields);
};

service._remove = service.remove;
service.remove = async (query = {}, options = {}) => {
  const items = await service._remove(query, options);
  return items.map((item) => _.omit(item, privateFields));
};

service._updateOne = service.updateOne;
service.updateOne = async (query = {}, updateFn = (doc) => doc, options = {}) => {
  const item = await service._updateOne(query, updateFn, options);
  return _.omit(item, privateFields);
};

service._updateMany = service.updateMany;
service.updateMany = async (query = {}, updateFn = (doc) => doc, options = {}) => {
  const items = await service._updateMany(query, updateFn, options);
  return items.map((item) => _.omit(item, privateFields));
};

module.exports = service;
