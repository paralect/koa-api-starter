// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'mount'.
const mount = require('koa-mount');

const accountResource = require('resources/account/public');
const healthResource = require('resources/health/public');

module.exports = (app: $TSFixMe) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/health', healthResource));
};
