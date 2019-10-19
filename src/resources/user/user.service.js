const { streamable } = require('node-mongo');

const db = require('db');
const constants = require('app.constants');
const securityUtil = require('security.util');

const schema = require('./user.schema');


const service = streamable(db.createService(constants.DATABASE_DOCUMENTS.USERS, schema));

service.markEmailAsVerified = (_id) => {
  return service.updateWithFunction(
    {
      _id,
    },
    (doc) => {
      const userDoc = doc;
      userDoc.isEmailVerified = true;
    },
  );
};

service.updateResetPasswordToken = (_id, token) => {
  return service.findOneAndUpdate(
    { _id },
    {
      $set: {
        resetPasswordToken: token,
      },
    },
  );
};

service.updatePassword = async (_id, newPassword) => {
  const hash = await securityUtil.getHash(newPassword);

  return service.updateWithFunction(
    {
      _id,
    },
    (doc) => {
      const userDoc = doc;
      userDoc.passwordHash = hash;
    },
  );
};

service.updateInfo = (_id, { email, firstName, lastName }) => {
  return service.updateWithFunction(
    {
      _id,
    },
    (doc) => {
      const userDoc = doc;
      userDoc.email = email;
      userDoc.firstName = firstName;
      userDoc.lastName = lastName;
    },
  );
};

service.updateLastRequest = async (_id) => {
  return service.update(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );
};

module.exports = service;
