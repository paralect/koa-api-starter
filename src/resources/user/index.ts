import Router from '@koa/router';
import getCurrent from './actions/get-current';
import list from './actions/list';
import removeAvatar from './actions/remove-avatar';
import updateCurrent from './actions/update-current';
import uploadAvatar from './actions/upload-avatar';

require('./user.handler');

const router = new Router();

getCurrent(router);
list(router);
removeAvatar(router);
updateCurrent(router);
uploadAvatar(router);

module.exports = router.routes();
