// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'formatErro... Remove this comment to see the full error message
function formatError(joiError: $TSFixMe) {
  const errors = {};

  joiError.details.forEach((error: $TSFixMe) => {
    const key = error.path.join('.');
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    errors[key] = errors[key] || [];
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    errors[key].push(error.message);
  });

  return errors;
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validate'.
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

module.exports = validate;
