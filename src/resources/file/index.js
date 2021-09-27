import Router from '@koa/router';

import uploadRegister from './upload/index.js';
import getDownloadUrlRegirster from './get-download-url/index.js';

const router = new Router();

uploadRegister(router);
getDownloadUrlRegirster(router);

export default router.routes();
