const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writers/writers.service');

const schema = Joi.object({
  pageNumber: Joi.number().min(0).default(2),
  documentsInPage: Joi.number().min(1).max(5).default(1),
  sortBy: Joi.string().valid("createdOn", "firstName", "lastName", "_id").default("_id"),
  sortOrder: Joi.string().valid("desc", "asc").default("asc")
});

async function handler(ctx) {
  const {
    pageNumber,
    documentsInPage,
    sortBy,
    sortOrder,
  } = ctx.validatedData;
  const data = await writerService.find({}, {
    page: pageNumber,
    perPage: documentsInPage,
    $sort: { [sortBy]: sortOrder },
  });
  ctx.body = data;
}

module.exports.register = (router) => {
  router.get('/pagination', validate(schema), handler);
};