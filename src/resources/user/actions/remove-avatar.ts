import config from 'config';
import userService from 'resources/user/user.service';
import cloudStorageService from 'services/cloud-storage/cloud-storage.service';

const getFileKey = (url: $TSFixMe) => url
  .replace(`https://${config.cloudStorage.bucket}.${config.cloudStorage.endpoint}/`, '');

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
    userService.update({ _id: user._id }, () => ({ avatarUrl: null })),
  ]);

  ctx.body = {};
}

export default (router: $TSFixMe) => {
  router.delete('/remove-photo', validator, handler);
};
