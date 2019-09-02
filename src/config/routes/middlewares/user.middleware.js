const moment = require('moment');
const userService = require('resources/user/user.service');
const { sessionTimeInMinutes } = require('config');

const userMiddleware = async (ctx, next) => {
  if (!ctx.state.user) {
    await next();
    return;
  }

  const user = await userService.findById(ctx.state.user._id);
  ctx.assert(user, 'Not authorized: user not found', 401);

  await userService.updateLastRequest(ctx.state.user._id);

  if (user.lastRequest && moment().diff(user.lastRequest, 'minutes') > sessionTimeInMinutes) {
    ctx.throw(418);
  }

  ctx.state.user = user;
  await next();
};

module.exports = userMiddleware;
