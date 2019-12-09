const userService = require('resources/user/user.service');


const handler = async (ctx) => {
  const user = await userService.findOne(ctx.state.user._id);

  ctx.body = userService.getPublic(user);
};

module.exports.register = (router) => {
  router.get('/current', handler);
};
