const mount = require('koa-mount');

const accountResource = require('resources/account/public');
const healthResource = require('resources/health/public');


module.exports.mount = (app) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/health', healthResource));
};
