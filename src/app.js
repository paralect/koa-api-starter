require('app-module-path').addPath(__dirname);

const Koa = require('koa');
const http = require('http');
const config = require('config');
const logger = require('logger');

process.env.APP_ENV = process.env.APP_ENV || 'development';

process.on('unhandledRejection', (reason, p) => {
  logger.error('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

const app = new Koa();
require('./config/koa')(app);

const server = http.createServer(app.callback());
require('services/socketIo.service')(server);

server.listen(config.port, () => {
  logger.warn(`Api server listening on ${config.port}, in ${process.env.NODE_ENV} mode and ${process.env.APP_ENV} environment`);
});

module.exports = app;
