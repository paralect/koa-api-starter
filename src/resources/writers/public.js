const Router = require('@koa/router');

const router = new Router();

require('./create').register(router);
require('./get').register(router);
require('./delete').register(router);
require('./update').register(router);

module.exports = router.routes();
