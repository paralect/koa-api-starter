const Router = require('@koa/router');

const router = new Router();

require('./upload').register(router);

module.exports = router.routes();
