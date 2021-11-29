const config = require('config');

const userService = require('resources/user/user.service');
const cloudStorageService = require('services/cloud-storage.service');

const getFileKey = (url) => url.replace(`https://${config.cloudStorage.bucket}.${config.cloudStorage.endpoint}/`, '');

async function handler(ctx) {
  const { user } = ctx.state;

  if (user.avatarUrl) {
    await Promise.all([
      cloudStorageService.deleteObject(getFileKey(user.avatarUrl)),
      userService.updateOne(
        { _id: user._id },
        (old) => ({
          ...old,
          avatarUrl: null,
        }),
      ),
    ]);
  }

  ctx.body = {};
}

module.exports.register = (router) => {
  router.delete('/remove-photo', handler);
};
