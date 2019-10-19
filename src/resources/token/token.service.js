const _ = require('lodash');

const db = require('db');
const securityUtil = require('security.util');
const config = require('config');
const { DATABASE_DOCUMENTS, TOKEN_SECURITY_LENGTH, TOKEN_TYPES } = require('app.constants');

const schema = require('./token.schema');


const service = db.createService(DATABASE_DOCUMENTS.TOKENS, schema);

service.createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 });

const createToken = async (userId, type, expireAt) => {
  const value = await securityUtil.generateSecureToken(TOKEN_SECURITY_LENGTH);

  return service.create({
    type, value, expireAt, userId,
  });
};

service.createAuthTokens = async (userId) => {
  const [accessTokenEntity, refreshTokenEntity] = await Promise.all([
    createToken(userId, TOKEN_TYPES.ACCESS, new Date(Date.now() + config.accessTokenExpiresIn)),
    createToken(userId, TOKEN_TYPES.REFRESH, new Date(Date.now() + config.refreshTokenExpiresIn)),
  ]);

  return {
    accessToken: accessTokenEntity.value,
    accessTokenExpireAt: accessTokenEntity.expireAt,
    refreshToken: refreshTokenEntity.value,
    refreshTokenExpireAt: refreshTokenEntity.expireAt,
  };
};

service.getUserIdByToken = async (token) => {
  const tokenEntity = await service.findOne({ value: token });

  return _.get(tokenEntity, 'userId', null);
};

service.removeAuthTokens = async (accessToken, refreshToken) => {
  return service.remove({ value: { $in: [accessToken, refreshToken] } });
};

module.exports = service;
