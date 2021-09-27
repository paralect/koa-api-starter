// allows require modules relative to /src folder
// for example: require('lib/mongo/idGenerator')
// all options can be found here: https://gist.github.com/branneman/8048520
import appModulePath from 'app-module-path';
import path from 'path';
import Koa from 'koa';

import initApp from './config/koa.js';
import config from './config/index.js';
import logger from './logger.js';

import './services/socketIo.service.js';

appModulePath.addPath(path.resolve());

process.env.APP_ENV = process.env.APP_ENV || 'development';

process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
  // application specific logging here
});

const app = new Koa();
initApp(app);

app.listen(config.port, () => {
  logger.warn(`Api server listening on ${config.port}, in ${process.env.NODE_ENV} mode and ${process.env.APP_ENV} environment`);
});

export default app;
