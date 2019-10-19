const { COOKIES: { ACCESS_TOKEN, REFRESH_TOKEN } } = require('app.constants');


const storeTokenToState = async (ctx, next) => {
  let accessToken = ctx.cookies.get(ACCESS_TOKEN);
  const refreshToken = ctx.cookies.get(REFRESH_TOKEN);

  const { authorization } = ctx.headers;

  if (!accessToken && authorization) {
    accessToken = authorization.replace('Bearer', '').trim();
  }

  ctx.state.accessToken = accessToken;
  ctx.state.refreshToken = refreshToken;

  await next();
};

module.exports = storeTokenToState;
