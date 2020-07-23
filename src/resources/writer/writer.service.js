const _ = require('lodash');

const db = require('db');
const constants = require('app.constants');

const validateSchema = require('./writer.schema');

const service = db.createService(constants.DATABASE_DOCUMENTS.WRITERS, { validateSchema });

module.exports = service;
