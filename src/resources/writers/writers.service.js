const db = require('db');
const constants = require('app.constants');

const service = db.createService(constants.DATABASE_DOCUMENTS.WRITERS);

service.addWriter = (writer) => {
  service.create(writer);
};

module.exports = service;
