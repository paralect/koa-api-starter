const moment = require('moment');
const { sessionTimeInMinutes } = require('config');
const userService = require('resources/user/user.service');

const validateSessionDuration = async (ctx, next) => {
  const { user } = ctx.state;

  await userService.updateLastRequest(ctx.state.user._id);

  if (user.lastRequest && moment().diff(user.lastRequest, 'minutes') > sessionTimeInMinutes) {
    ctx.throw(418);
  }

  return next();
};

module.exports = validateSessionDuration;
