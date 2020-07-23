const Joi = require('@hapi/joi');

const writerService = require('resources/writer/writer.service');

async function handler() {
  writerService._collection.drop();
}

module.exports.register = (router) => {
  router.post('/clear', handler);
};
