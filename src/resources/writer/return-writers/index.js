const Joi = require('@hapi/joi');

const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  ctx.body = await writerService.find();
}

module.exports.register = (router) => {
  router.get('/return-writers', handler);
};
