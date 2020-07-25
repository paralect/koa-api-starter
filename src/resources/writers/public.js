const Router = require('@koa/router');


const router = new Router();

require('./create-writer').register(router);
require('./get-writer').register(router);
require('./update-writer').register(router);
require('./delete-writer').register(router);
require('./add-book').register(router);
require('./update-books').register(router);
require('./list-of-writers').register(router);

module.exports = router.routes();
