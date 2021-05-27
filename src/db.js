const config = require('config');
const db = require('@paralect/node-mongo').connect(config.mongo.connection);

module.exports = db;
3234324
erwerew
