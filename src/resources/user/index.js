const Router = require('@koa/router');

require('./user.handler');


const router = new Router();

require('./getCurrent').register(router);
require('./updateCurrent').register(router);

module.exports = router.routes();
