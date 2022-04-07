import mount from 'koa-mount';
import userResource from 'resources/user';

module.exports = (app: $TSFixMe) => {
  app.use(mount('/users', userResource));
};
