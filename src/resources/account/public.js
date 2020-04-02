const Router = require('@koa/router');


const router = new Router();

require('./signup').register(router);
require('./logout').register(router);
require('./verifyEmail').register(router);
require('./signin').register(router);
require('./forgotPassword').register(router);
require('./resetPassword').register(router);
require('./resendVerification').register(router);
require('./refreshToken').register(router);

require('./google').register(router);

module.exports = router.routes();
