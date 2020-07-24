const _ = require('lodash');

const db = require('db');
const constants = require('app.constants');

const validateSchema = require('./writers.schema');

const service = db.createService(constants.DATABASE_DOCUMENTS.WRITERS, { validateSchema });

const fields = [
  'firstName',
  'lastName',
  'books',
];

module.exports = service;
