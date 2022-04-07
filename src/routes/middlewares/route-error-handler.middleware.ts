// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'logger'.
const logger = require('logger');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'routeError... Remove this comment to see the full error message
const routeErrorHandler = async (ctx: $TSFixMe, next: $TSFixMe) => {
  try {
    await next();
  } catch (error) {
    const clientError = error.errors;
    const serverError = { global: error.message };

    const errors = clientError || serverError;
    logger.error(errors);

    if (serverError && process.env.APP_ENV === 'production') {
      serverError.global = 'Something went wrong';
    }

    ctx.status = error.status || 500;
    ctx.body = { errors };
  }
};

module.exports = routeErrorHandler;
