import { Schema, ValidationError, ValidationErrorItem } from 'joi';
import { AppKoaContext, Next, ValidationErrors } from 'types';

function formatError(joiError: ValidationError): ValidationErrors {
  const errors: ValidationErrors = {};

  joiError.details.forEach((error: ValidationErrorItem) => {
    const key = error.path.join('.');
    errors[key] = errors[key] || [];
    errors[key].push(error.message);
  });

  return errors;
}

function validate(schema: Schema) {
  return async (ctx: AppKoaContext, next: Next) => {
    const { value, error } = schema.validate(
      {
        ...ctx.request.body,
        ...ctx.query,
        ...ctx.params,
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
