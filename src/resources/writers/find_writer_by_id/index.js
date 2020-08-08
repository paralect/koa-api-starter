const Joi = require('@hapi/joi');

const writerService = require('resources/writers/writers.service');

async function handler(ctx) {
  let findId = await writerService.findOne(
    { _id: ctx.params.id }
  );
  ctx.body = findId;
}

module.exports.register = (router) => {
  router.get('/find_id/:id', handler);
};
