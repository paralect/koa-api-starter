import mount from 'koa-mount';
import accountResource from 'resources/account/public';
import healthResource from 'resources/health/public';

export default (app: $TSFixMe) => {
  app.use(mount('/account', accountResource.routes));
  app.use(mount('/health', healthResource.routes));
};
