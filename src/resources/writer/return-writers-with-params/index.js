const Joi = require('@hapi/joi');

const validate = require('middlewares/validate');
const writerService = require('resources/writer/writer.service');
const sortByEnum = ["createdOn", "firstName", "lastName", "id"];
const sortOrderEnum = ["asc", "desc"];

const schema = Joi.object({
  pageNumber: Joi.number().required(),
  documentsInPage: Joi.number().required(),
  sortBy:
    Joi.string().valid(...sortByEnum),
  sortOrder:
    Joi.string().valid(...sortOrderEnum),
});

async function handler(ctx) {
  const {
    pageNumber,
    documentsInPage,
  } = ctx.query;

  let {
    sortOrder,
    sortBy,
  } = ctx.query;


  switch (sortOrder) {
    case 'asc':
      sortOrder = 1;
      break;
    case 'desc':
      sortOrder = -1;
      break;
  };

  if (sortBy === 'id') sortBy = '_id';

  console.log(pageNumber, documentsInPage, sortBy, sortOrder);

  ctx.body = await writerService.find({}, {
    perPage: +documentsInPage,
    page: +pageNumber,
    sort: { [sortBy]: sortOrder }
  });
}

module.exports.register = (router) => {
  router.get('/get', validate(schema), handler);
};


