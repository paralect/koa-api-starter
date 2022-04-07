// @ts-expect-error ts-migrate(2649) FIXME: Cannot augment module '_' with value exports becau... Remove this comment to see the full error message
const _ = require('lodash');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'formatErro... Remove this comment to see the full error message
const formatError = (customError: $TSFixMe) => {
  const errors = {};

  Object.keys(customError).forEach((key) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    errors[key] = _.isArray(customError[key])
      ? customError[key]
      : [customError[key]];
  });

  return errors;
};

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'attachCust... Remove this comment to see the full error message
const attachCustomErrors = async (ctx: $TSFixMe, next: $TSFixMe) => {
  ctx.throwError = (message: $TSFixMe) => ctx.throw(500, { message });
  ctx.assertError = (condition: $TSFixMe, message: $TSFixMe) => ctx.assert(condition, 500, { message });

  ctx.throwClientError = (errors: $TSFixMe) => ctx.throw(400, { errors: formatError(errors) });
  ctx.assertClientError = (condition: $TSFixMe, errors: $TSFixMe) => ctx.assert(condition, 400, { errors: formatError(errors) });

  await next();
};

module.exports = attachCustomErrors;
