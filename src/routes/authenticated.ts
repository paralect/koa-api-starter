import mount from 'koa-mount';
import userResource from 'resources/user';

export default (app: $TSFixMe) => {
  app.use(mount('/users', userResource.routes));
};
