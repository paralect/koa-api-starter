const Router = require('@koa/router');

const router = new Router();

require('./create-writer-and-books').register(router);
require('./return-writers').register(router);
require('./return-writer').register(router);

/*
require('./update-writer').register(router);
require('./delete-writer').register(router);
require('./update-writer-books').register(router);
*/

require('./clear').register(router);

module.exports = router.routes();
