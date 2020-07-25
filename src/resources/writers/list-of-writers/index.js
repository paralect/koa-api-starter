const writerService = require('resources/writer/writer.service');
const validate = require('middlewares/validate');
const Joi = require('@hapi/joi');

const schema = Joi.object({
  pgNum: Joi.number().integer().min(0),
  docNum: Joi.number().integer().min(1).max(5),
  sortBy: Joi.string(),
  sortOrder: Joi.string(),
});

async function handler(ctx) {
  let {pgNum, docNum, sortBy, sortOrder} = ctx.params;
  if (!sortBy) {
    sortBy = '_id';
  }
  const sorting = sortOrder === 'asc' ? 1 : -1;

  const writersList = (
    await writerService._collection.find({}, {
      sort: { [sortBy]: sorting },
      skip: pgNum * docNum - 1,
      maxPages: +docNum,
    })
  );

  const count = await writerService.count();
  ctx.body = {
    data: writersList,
    meta: {
      numberOfAllDocuments: count,
    },
  }
}

module.exports.register = (router) => {
  router.get('/listofwriters/:pgNum/:docNum/:sortBy/:sortOrder', validate(schema), handler);
};
