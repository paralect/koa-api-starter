// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Router'.
const Router = require('@koa/router');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'router'.
const router = new Router();

require('./get').register(router);

module.exports = router.routes();
