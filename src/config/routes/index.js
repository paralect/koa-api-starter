const jwt = require('koa-jwt');

const config = require('config');

const { urlToken, user, applicationId } = require('./middlewares');
const publicRoutes = require('./public');
const authenticatedRoutes = require('./authenticated');

const defineRoutes = (app) => {
  app.use(applicationId);
  publicRoutes(app);

  app.use(urlToken);
  app.use(jwt(config.jwt));
  app.use(user);

  authenticatedRoutes(app);
};

module.exports = defineRoutes;
