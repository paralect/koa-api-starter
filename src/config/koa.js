const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const validate = require('koa-validate');
const requestLogger = require('koa-logger');
const qs = require('koa-qs');

const logger = require('logger');
const routes = require('./routes');

const routeErrorHandler = async (ctx, next) => {
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

module.exports = (app) => {
  app.use(cors({ credentials: true }));
  app.use(helmet());
  qs(app);
  app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
  app.use(requestLogger());

  validate(app);

  app.use(routeErrorHandler);

  routes(app);
};
