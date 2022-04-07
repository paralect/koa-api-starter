import auth from './middlewares/auth.middleware';
import tryToAttachUser from './middlewares/try-to-attach-user.middleware';
import extractTokens from './middlewares/extract-tokens.middleware';
import attachCustomErrors from './middlewares/attach-custom-errors.middleware';
import routeErrorHandler from './middlewares/route-error-handler.middleware';

import publicRoutes from './public';
const authenticatedRoutes = require('./authenticated');

const defineRoutes = (app: $TSFixMe) => {
  app.use(attachCustomErrors);
  app.use(routeErrorHandler);

  app.use(extractTokens);
  app.use(tryToAttachUser);

  publicRoutes(app);

  app.use(auth);

  authenticatedRoutes(app);
};

module.exports = defineRoutes;
