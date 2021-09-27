import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import helmet from 'koa-helmet';
import validate from 'koa-validate';
import requestLogger from 'koa-logger';
import qs from 'koa-qs';

import logger from '../logger.js';

import routes from './routes/index.js';

const routeErrorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const status = error.status || 500;
    const errors = error.errors || error.message;

    ctx.status = status;
    ctx.body = process.env.APP_ENV === 'production'
      ? { errors: error.errors || { _global: ['Something went wrong.'] } }
      : { errors: error.errors || { _global: [error.message] } };

    logger.error(errors);
  }
};

export default (app) => {
  app.use(cors({ credentials: true }));
  app.use(helmet());
  qs(app);
  app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
  app.use(requestLogger());

  validate(app);

  app.use(routeErrorHandler);

  routes(app);
};
