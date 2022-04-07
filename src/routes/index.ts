// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'auth'.
const auth = require('./middlewares/auth.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tryToAttac... Remove this comment to see the full error message
const tryToAttachUser = require('./middlewares/try-to-attach-user.middleware');
const extractTokens = require('./middlewares/extract-tokens.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'attachCust... Remove this comment to see the full error message
const attachCustomErrors = require('./middlewares/attach-custom-errors.middleware');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'routeError... Remove this comment to see the full error message
const routeErrorHandler = require('./middlewares/route-error-handler.middleware');
const publicRoutes = require('./public');
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
