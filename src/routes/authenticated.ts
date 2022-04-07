// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'mount'.
const mount = require('koa-mount');

const userResource = require('resources/user');

module.exports = (app: $TSFixMe) => {
  app.use(mount('/users', userResource));
};
