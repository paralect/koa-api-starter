const userService = require('resources/user/user.service');


const handler = async (ctx) => {
  ctx.body = {
    user: userService.getPublic(ctx.state.user),
  };
};

module.exports.register = (router) => {
  router.get('/current', handler);
};
