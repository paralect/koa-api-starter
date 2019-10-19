const jwt = require('jsonwebtoken');
const _ = require('lodash');

const logger = require('logger');
const config = require('config');


exports.createAuthToken = ({ userId }) => {
  const payload = {
    _id: userId,
  };

  return jwt.sign(payload, config.jwt.secret, _.pick(config.jwt, ['audience', 'issuer']));
};

exports.decodeToken = (token) => {
  let res;

  try {
    res = jwt.verify(token, config.jwt.secret);
  } catch (err) {
    logger.warn('Invalid json web token', err);
  }

  return res;
};
