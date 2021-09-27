import { COOKIES } from '../../../app.constants.js';

const { ACCESS_TOKEN } = COOKIES;

const storeTokenToState = async (ctx, next) => {
  let accessToken = ctx.cookies.get(ACCESS_TOKEN);

  const { authorization } = ctx.headers;

  if (!accessToken && authorization) {
    accessToken = authorization.replace('Bearer', '').trim();
  }

  ctx.state.accessToken = accessToken;

  await next();
};

export default storeTokenToState;
