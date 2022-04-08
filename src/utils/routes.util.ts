import Router from '@koa/router';

export type RegisterRouteFunc = (router: $TSFixMe) => void;

const getRoutes = (routeFunctions: RegisterRouteFunc[]): $TSFixMe => {
  const router = new Router();
  routeFunctions.forEach((func: RegisterRouteFunc) => {
    func(router);
  });

  return router.routes();
};

export default {
  getRoutes,
};
