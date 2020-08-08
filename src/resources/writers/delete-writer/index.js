const Joi = require('@hapi/joi');

const writerService = require('resources/writers/writers.service');

async function handler(ctx) {
  let findId = await writerService.findOne(
    { _id: ctx.params.id }
  );
  console.log(findId)
  let findIdremove = await writerService.remove(findId);
  ctx.body = findIdremove;
}

module.exports.register = (router) => {
  router.delete('/remove_id/:id', handler);
};
