// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tokenServi... Remove this comment to see the full error message
const tokenService = require('resources/token/token.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'tryToAttac... Remove this comment to see the full error message
const tryToAttachUser = async (ctx: $TSFixMe, next: $TSFixMe) => {
  let userData;

  if (ctx.state.accessToken) {
    userData = await tokenService.getUserDataByToken(ctx.state.accessToken);
  }

  if (userData) {
    await userService.updateLastRequest(userData.userId);
    ctx.state.user = await userService.findOne({ _id: userData.userId });
  }

  return next();
};

module.exports = tryToAttachUser;
