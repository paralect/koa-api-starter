import cloudStorageService from '../../../services/cloud-storage.service.js';

async function validate(ctx, next) {
  try {
    const data = await cloudStorageService.getSignedDownloadUrl(ctx.params.key);
    ctx.validatedData = data;
  } catch (error) {
    ctx.assertError(error.code, {
      file: [`An error has occurred (${error.code})`],
    }, error.statusCode);
  }

  await next();
}

async function handler(ctx) {
  try {
    ctx.body = { url: ctx.validatedData };
  } catch (error) {
    ctx.throw(error);
  }
}

export default (router) => {
  router.get('/:key', validate, handler);
};
