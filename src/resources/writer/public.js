const Router = require('@koa/router');

const router = new Router();

require('./create-writer-and-books').register(router);
require('./return-writer').register(router);
require('./return-writer-id').register(router);
require('./delete-writer-id').register(router);
require('./add-writer-book').register(router);

/*
require('./update-writer').register(router);
require('./update-writer-books').register(router);
*/

module.exports = router.routes();
