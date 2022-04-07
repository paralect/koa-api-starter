import config from 'config';
import userService from 'resources/user/user.service';
import cloudStorageService from 'services/cloud-storage/cloud-storage.service';
import uploadMiddleware from 'middlewares/upload-file.middleware';

const getFileKey = (url: $TSFixMe) => url
  .replace(`https://${config.cloudStorage.bucket}.${config.cloudStorage.endpoint}/`, '');

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

  const updatedUser = await userService.update({ _id: user._id }, () => ({ avatarUrl: Location }));

  ctx.body = userService.getPublic(updatedUser);
}

export default (router: $TSFixMe) => {
  router.post('/upload-photo', uploadMiddleware.single('file'), validator, handler);
};
