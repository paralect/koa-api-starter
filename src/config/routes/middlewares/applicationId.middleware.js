const applicationId = async (ctx, next) => {
  ctx.state.applicationId = ctx.header['x-application-id'];
  await next();
};

module.exports = applicationId;
