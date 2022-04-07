import _ from 'lodash';

const formatError = (customError: $TSFixMe) => {
  const errors: $TSFixMe = {};

  Object.keys(customError).forEach((key) => {
    errors[key] = _.isArray(customError[key])
      ? customError[key]
      : [customError[key]];
  });

  return errors;
};

const attachCustomErrors = async (ctx: $TSFixMe, next: $TSFixMe) => {
  ctx.throwError = (message: $TSFixMe) => ctx.throw(500, { message });
  ctx.assertError = (condition: $TSFixMe, message: $TSFixMe) => ctx.assert(condition, 500, { message });

  ctx.throwClientError = (errors: $TSFixMe) => ctx.throw(400, { errors: formatError(errors) });
  ctx.assertClientError = (condition: $TSFixMe, errors: $TSFixMe) => ctx.assert(condition, 400, { errors: formatError(errors) });

  await next();
};

export default attachCustomErrors;
