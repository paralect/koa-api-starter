import logger from 'logger';

const routeErrorHandler = async (ctx: $TSFixMe, next: $TSFixMe) => {
  try {
    await next();
  } catch (error: $TSFixMe) {
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

export default routeErrorHandler;
