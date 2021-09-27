import Router from '@koa/router';

import './user.handler.js';

import getCurrentRegister from './get-current/index.js';
import updateCurrentRegister from './update-current/index.js';
import listUsersRegister from './list-users/index.js';

const router = new Router();

getCurrentRegister(router);
updateCurrentRegister(router);
listUsersRegister(router);

export default router.routes();
