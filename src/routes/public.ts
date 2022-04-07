import mount from 'koa-mount';
import accountResource from 'resources/account/public';
import healthResource from 'resources/health/public';

module.exports = (app: $TSFixMe) => {
  app.use(mount('/account', accountResource));
  app.use(mount('/health', healthResource));
};
