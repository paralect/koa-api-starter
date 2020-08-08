const Router = require('@koa/router');

const router = new Router();

require('./create-writer').register(router);
require('./update-writer').register(router);
require('./find_writer_by_id').register(router);
require('./delete-writer').register(router);
require('./book-add').register(router);
require('./book-delete').register(router);
require('./book-update').register(router);
require('./writer-pages').register(router);

module.exports = router.routes();
