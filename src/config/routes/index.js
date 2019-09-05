const auth = require('./middlewares/auth.middleware');
const tryToAttachUser = require('./middlewares/tryToAttachUser.middleware');
const extractTokens = require('./middlewares/extractTokens.middleware');
const validateSessionDuration = require('./middlewares/validateSessionDuration.middleware');
const publicRoutes = require('./public');
const authenticatedRoutes = require('./authenticated');

const defineRoutes = (app) => {
  app.use(extractTokens);
  app.use(tryToAttachUser);

  publicRoutes(app);

  app.use(auth);
  app.use(validateSessionDuration);

  authenticatedRoutes(app);
};

module.exports = defineRoutes;
