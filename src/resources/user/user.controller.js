const _ = require('lodash');

const userService = require('./user.service');


const userOmitFelds = ['passwordHash', 'signupToken', 'resetPasswordToken'];

exports.getCurrent = async (ctx) => {
  const user = await userService.findOne(ctx.state.user._id);

  ctx.body = _.omit(user, userOmitFelds);
};

exports.updateCurrent = async (ctx) => {
  const userData = ctx.validatedRequest.value;
  const user = await userService.updateInfo(ctx.state.user._id, userData);

  ctx.body = _.omit(user, userOmitFelds);
};
