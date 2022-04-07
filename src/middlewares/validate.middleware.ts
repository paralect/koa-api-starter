function formatError(joiError: $TSFixMe) {
  const errors: $TSFixMe = {};

  joiError.details.forEach((error: $TSFixMe) => {
    const key = error.path.join('.');
    errors[key] = errors[key] || [];
    errors[key].push(error.message);
  });

  return errors;
}

function validate(schema: $TSFixMe) {
  return async (ctx: $TSFixMe, next: $TSFixMe) => {
    const { value, error } = await schema.validate(
      {
        ...ctx.request.body,
        ...ctx.query,
      },
      {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: {
          objects: true,
        },
      },
    );

    if (error) ctx.throw(400, { errors: formatError(error) });

    ctx.validatedData = value;
    await next();
  };
}

export default validate;
