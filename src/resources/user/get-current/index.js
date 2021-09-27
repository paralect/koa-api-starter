import userService from '../user.service.js';

async function handler(ctx) {
  ctx.body = userService.getPublic(ctx.state.user);
}

export default (router) => {
  router.get('/current', handler);
};
