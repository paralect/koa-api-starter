import mount from 'koa-mount';

import accountResource from '../../resources/account/public.js';
import healthResource from '../../resources/health/public.js';

export default (app) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/health', healthResource));
};
