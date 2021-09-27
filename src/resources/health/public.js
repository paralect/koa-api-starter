import Router from '@koa/router';

import getRegiser from './get/index.js';

const router = new Router();

getRegiser(router);

export default router.routes();
