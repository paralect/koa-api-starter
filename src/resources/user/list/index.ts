// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Joi'.
const Joi = require('joi');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
const validate = require('middlewares/validate.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'schema'.
const schema = Joi.object({
  page: Joi.number().default(1),
  perPage: Joi.number().default(10),
  sort: Joi.object({}).keys({
    createdOn: Joi.number(),
  }).default({ createdOn: -1 }),
  searchValue: Joi.string().allow(null, '').default(''),
});

async function handler(ctx: $TSFixMe) {
  const {
    perPage, page, sort, searchValue,
  } = ctx.validatedData;

  const validatedSearch = searchValue.split('\\').join('\\\\').split('.').join('\\.');
  const regExp = new RegExp(validatedSearch, 'gi');

  const users = await userService.find(
    {
      $or: [
        { firstName: { $regex: regExp } },
        { lastName: { $regex: regExp } },
        { email: { $regex: regExp } },
      ],
    },
    {
      page,
      perPage,
      sort,
    },
  );

  ctx.body = {
    items: users.results,
    totalPages: users.pagesCount,
    count: users.count,
  };
}

module.exports.register = (router: $TSFixMe) => {
  router.get('/', validate(schema), handler);
};
