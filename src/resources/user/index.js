const Router = require('koa-router');

const validate = require('middlewares/validate');

const validators = require('./validators');
const controller = require('./user.controller');
require('./user.handler');


const router = new Router();

router.get('/current', controller.getCurrent);
router.put('/current', validate(validators.update), controller.updateCurrent);

module.exports = router.routes();
