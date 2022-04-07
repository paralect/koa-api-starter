// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/andrew/work/koa-api-starter/src/db.ts... Remove this comment to see the full error message
import db from 'db';
const securityUtil = require('security.util');
const { DATABASE_DOCUMENTS, TOKEN_SECURITY_LENGTH, TOKEN_TYPES } = require('app.constants');

const validateSchema = require('./token.schema');

const service = db.createService(DATABASE_DOCUMENTS.TOKENS, { validate: validateSchema });

const createToken = async (userId: $TSFixMe, type: $TSFixMe) => {
  const value = await securityUtil.generateSecureToken(TOKEN_SECURITY_LENGTH);

  return service.create({
    type, value, userId,
  });
};

service.createAuthTokens = async ({
  userId,
}: $TSFixMe) => {
  const accessTokenEntity = await createToken(userId, TOKEN_TYPES.ACCESS);

  return {
    accessToken: accessTokenEntity.value,
  };
};

service.getUserDataByToken = async (token: $TSFixMe) => {
  const tokenEntity = await service.findOne({ value: token });

  return tokenEntity && {
    userId: tokenEntity.userId,
  };
};

service.removeAuthTokens = async (accessToken: $TSFixMe) => {
  return service.remove({ value: { $in: [accessToken] } });
};

module.exports = service;
