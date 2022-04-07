import userService from 'resources/user/user.service';

async function handler(ctx: $TSFixMe) {
  ctx.body = userService.getPublic(ctx.state.user);
}

export default (router: $TSFixMe) => {
  router.get('/current', handler);
};
