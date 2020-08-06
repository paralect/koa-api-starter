const mount = require('koa-mount');

const accountResource = require('resources/account/public');
const healthResource = require('resources/health/public');
const writersResourse = require('resources/writers/public');


module.exports = (app) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/health', healthResource));
  app.use(mount('/writer', writersResourse));
};
