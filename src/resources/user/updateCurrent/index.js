const validate = require('middlewares/validate');
const userService = require('resources/user/user.service');

const validator = require('./validator');


const handler = async (ctx) => {
  const userData = ctx.validatedRequest.value;
  const user = await userService.updateInfo(ctx.state.user._id, userData);

  ctx.body = userService.getPublic(user);
};

module.exports.register = (router) => {
  router.put('/current', validate(validator), handler);
};
