const config = require('config');

const userService = require('resources/user/user.service');
const cloudStorageService = require('services/cloud-storage/cloud-storage.service');
const uploadMiddleware = require('middlewares/upload-file.middleware');

const getFileKey = (url) => url.replace(`https://${config.cloudStorage.bucket}.${config.cloudStorage.endpoint}/`, '');

async function validate(ctx, next) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  ctx.assertError(file, {
    file: 'File cannot be empty',
  });

  if (user.avatarUrl) cloudStorageService.deleteObject(getFileKey(user.avatarUrl));

  await next();
}

async function handler(ctx) {
  const { user } = ctx.state;
  const { file } = ctx.request;

  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const { Location } = await cloudStorageService.uploadPublic(`avatars/${fileName}`, file);

  const updatedUser = await userService.updateOne(
    { _id: user._id },
    (old) => ({
      ...old,
      avatarUrl: Location,
    }),
  );

  ctx.body = userService.getPublic(updatedUser);
}

module.exports.register = (router) => {
  router.post('/upload-photo', uploadMiddleware.single('file'), validate, handler);
};
