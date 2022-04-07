import { COOKIES } from 'app.constants';

const storeTokenToState = async (ctx: $TSFixMe, next: $TSFixMe) => {
  let accessToken = ctx.cookies.get(COOKIES.ACCESS_TOKEN);

  const { authorization } = ctx.headers;

  if (!accessToken && authorization) {
    accessToken = authorization.replace('Bearer', '').trim();
  }

  ctx.state.accessToken = accessToken;

  await next();
};

export default storeTokenToState;
