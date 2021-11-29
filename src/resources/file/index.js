const Router = require('@koa/router');

const router = new Router();

require('./upload-photo').register(router);
require('./remove-photo').register(router);
require('./get-download-url').register(router);

module.exports = router.routes();
