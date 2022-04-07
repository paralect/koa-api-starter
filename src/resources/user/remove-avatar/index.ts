// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'cloudStora... Remove this comment to see the full error message
const cloudStorageService = require('services/cloud-storage/cloud-storage.service');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFileKey... Remove this comment to see the full error message
const getFileKey = (url: $TSFixMe) => url.replace(`https://${config.cloudStorage.bucket}.${config.cloudStorage.endpoint}/`, '');

async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const { user } = ctx.state;

  ctx.assertClientError(user.avatarUrl, {
    global: 'You don\'t have avatar',
  });

  await next();
}

async function handler(ctx: $TSFixMe) {
  const { user } = ctx.state;

  await Promise.all([
    cloudStorageService.deleteObject(getFileKey(user.avatarUrl)),
    userService.updateOne(
      { _id: user._id },
      (old: $TSFixMe) => ({
        ...old,
        avatarUrl: null,
      }),
    ),
  ]);

  ctx.body = {};
}

module.exports.register = (router: $TSFixMe) => {
  router.delete('/remove-photo', validator, handler);
};
