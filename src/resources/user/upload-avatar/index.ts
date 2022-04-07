// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('config');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'userServic... Remove this comment to see the full error message
const userService = require('resources/user/user.service');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'cloudStora... Remove this comment to see the full error message
const cloudStorageService = require('services/cloud-storage/cloud-storage.service');
const uploadMiddleware = require('middlewares/upload-file.middleware');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getFileKey... Remove this comment to see the full error message
const getFileKey = (url: $TSFixMe) => url.replace(`https://${config.cloudStorage.bucket}.${config.cloudStorage.endpoint}/`, '');

async function validator(ctx: $TSFixMe, next: $TSFixMe) {
  const { file } = ctx.request;

  ctx.assertClientError(file, {
    global: 'File cannot be empty',
  });

  await next();
}

async function handler(ctx: $TSFixMe) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  if (user.avatarUrl) await cloudStorageService.deleteObject(getFileKey(user.avatarUrl));

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const { Location } = await cloudStorageService.uploadPublic(`avatars/${fileName}`, file);

  const updatedUser = await userService.updateOne(
    { _id: user._id },
    (old: $TSFixMe) => ({
      ...old,
      avatarUrl: Location,
    }),
  );

  ctx.body = userService.getPublic(updatedUser);
}

module.exports.register = (router: $TSFixMe) => {
  router.post('/upload-photo', uploadMiddleware.single('file'), validator, handler);
};
