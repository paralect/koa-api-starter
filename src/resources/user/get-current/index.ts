// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');

async function handler(ctx: $TSFixMe) {
  ctx.body = userService.getPublic(ctx.state.user);
}

module.exports.register = (router: $TSFixMe) => {
  router.get('/current', handler);
};
