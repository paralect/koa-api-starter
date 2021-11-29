const attachThrowError = async (ctx, next) => {
  ctx.throwClientError = (errors) => {
    ctx.throw(400, { errors });

    return null;
  };

  ctx.throwError = (message) => {
    ctx.throw(500, { message });

    return null;
  };

  ctx.assertClientError = (condition, errors) => {
    ctx.assert(condition, 400, { errors });

    return null;
  };

  ctx.assertError = (condition, message) => {
    ctx.assert(condition, 500, { message });

    return null;
  };

  ctx.forbiddenError = (condition, message) => {
    ctx.assert(condition, 403, { message });

    return null;
  };

  await next();
};

module.exports = attachThrowError;
