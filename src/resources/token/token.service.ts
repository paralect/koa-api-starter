import db from 'db';
import securityUtil from 'utils/security.util';
import { DATABASE_DOCUMENTS, TOKEN_SECURITY_LENGTH, COOKIES } from 'app.constants';
import validateSchema from './token.schema';

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
  const accessTokenEntity = await createToken(userId, COOKIES.ACCESS_TOKEN);

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

export default service;
