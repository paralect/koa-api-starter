// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Router'.
const Router = require('@koa/router');

require('./user.handler');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'router'.
const router = new Router();

require('./get-current').register(router);
require('./update-current').register(router);
require('./upload-avatar').register(router);
require('./remove-avatar').register(router);

require('./list').register(router);

module.exports = router.routes();
