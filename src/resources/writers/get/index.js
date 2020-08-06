const writerService = require('resources/writers/writers.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');

const listSchema = Joi.object({
  pageNumber: Joi.number().required(),
  documentsInPage: Joi.number().required(),
  sortBy: Joi.string()
    .valid('createdOn', 'firstName', 'lastName', 'id')
    .default('id'),
  sortOrder: Joi.string().valid('desc', 'asc'),
});

const handler = async ({ response, params: { id } }) => {
  const writer = await writerService.findOne({ _id: id });
  response.body = writer;
};

const writerListHandler = async ({
  request: {
    body: {
      documentsInPage,
      pageNumber,
      sortOrder,
      sortBy,
    },
  },
  response,
}) => {
  const data = await writerService.find(
    {},
    {
      page: +pageNumber,
      perPage: +documentsInPage,
      $sort: { [sortBy]: sortOrder },
    },
  );
  response.body = data;
};

module.exports.register = (router) => {
  router.get('/:id', handler);
  router.post('/list', validate(listSchema), writerListHandler);
};
