const Router = require('@koa/router');

const router = new Router();

require('./get-current').register(router);
require('./update-current').register(router);

module.exports = router.routes();
