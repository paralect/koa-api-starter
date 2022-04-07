const auth = (ctx: $TSFixMe, next: $TSFixMe) => {
  if (ctx.state.user) {
    return next();
  }

  ctx.status = 401;
  ctx.body = {};
  return null;
};

export default auth;
