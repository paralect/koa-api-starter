const Router = require('@koa/router');

require('./user.handler');

const router = new Router();

require('./get-current').register(router);
require('./list-users').register(router);
require('./upload-photo').register(router);
require('./remove-photo').register(router);

module.exports = router.routes();
