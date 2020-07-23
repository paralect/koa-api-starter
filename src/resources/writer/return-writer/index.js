const Joi = require('@hapi/joi');

const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  console.log(Boolean(ctx.params.id));
  console.log(Boolean(ctx.params));
  ctx.body = await writerService.find({ _id: Number(ctx.params.id) });
}

module.exports.register = (router) => {
  router.get('/return-writer/:id', handler);
};
