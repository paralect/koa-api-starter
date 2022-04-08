import authService from 'services/auth/auth.service';

const handler = async (ctx: $TSFixMe) => {
  await authService.unsetTokens(ctx);
  ctx.body = {};
};

export default (router: $TSFixMe) => {
  router.post('/sign-out', handler);
};
