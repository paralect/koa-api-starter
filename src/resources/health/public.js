const Router = require('koa-router');

const router = new Router();
const controller = require('./health.controller');

router.get('/', controller.getHealthStatus);

module.exports = router.routes();
