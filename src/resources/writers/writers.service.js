const _ = require('lodash');

const db = require('db');
const constants = require('app.constants');

const validateSchema = require('./writers.schema');

const service = db.createService(constants.DATABASE_DOCUMENTS.WRITERS, { validateSchema });

service.updateLastRequest = async (_id) => {
  return service.atomic.update({ _id }, {
    $set: {
      updatedOn: new Date(),
      lastRequest: new Date(),
    },
  });
};

service.updateLastRequest = async (_id) => {
  return service.atomic.update({ _id }, {
    $set: {
      updatedOn: new Date(),
      lastRequest: new Date(),
    },
  });
};


service.writeDB = async (writers) => {
  return  service.create(writers);
};

module.exports = service;
