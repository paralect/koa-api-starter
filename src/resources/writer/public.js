const Router = require('@koa/router');

const router = new Router();

require('./return-writers-with-params').register(router);
require('./create-writer-and-books').register(router);
require('./return-writer').register(router);
require('./return-writers').register(router);
require('./add-writer-book').register(router);
require('./update-writer-books').register(router);
require('./delete-writer-book').register(router);
require('./delete-writer').register(router);
require('./update-writer').register(router);

module.exports = router.routes();
