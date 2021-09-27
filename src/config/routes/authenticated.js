import mount from 'koa-mount';

import userResource from '../../resources/user/index.js';
import fileResource from '../../resources/file/index.js';

export default (app) => {
  app.use(mount('/users', userResource));
  app.use(mount('/files', fileResource));
};
