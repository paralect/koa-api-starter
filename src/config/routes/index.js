import attachThrowError from '../../middlewares/attachThrowError.js';
import auth from './middlewares/auth.middleware.js';
import tryToAttachUser from './middlewares/tryToAttachUser.middleware.js';
import extractTokens from './middlewares/extractTokens.middleware.js';
import publicRoutes from './public.js';
import authenticatedRoutes from './authenticated.js';

const defineRoutes = (app) => {
  app.use(attachThrowError);

  app.use(extractTokens);
  app.use(tryToAttachUser);

  publicRoutes(app);

  app.use(auth);

  authenticatedRoutes(app);
};

export default defineRoutes;
