import Router from '@koa/router';
const router = new Router();
import getAction from './actions/get';

getAction(router);

export default router.routes();
