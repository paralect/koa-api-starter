const Router = require('@koa/router');


const router = new Router();

require('./create-writer').register(router);

module.exports = router.routes();
