const Router = require('@koa/router');

require('./user.handler');

const router = new Router();

require('./get-current').register(router);
require('./update-current').register(router);

module.exports = router.routes();
