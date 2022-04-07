// @ts-expect-error ts-migrate(2649) FIXME: Cannot augment module '_' with value exports becau... Remove this comment to see the full error message
const _ = require('lodash');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('db');
const constants = require('app.constants');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validateSc... Remove this comment to see the full error message
const validateSchema = require('./user.schema');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'service'.
const service = db.createService(constants.DATABASE_DOCUMENTS.USERS, { validate: validateSchema });

service.updateLastRequest = async (_id: $TSFixMe) => {
  return service.atomic.update({ _id }, {
    $set: {
      lastRequest: new Date(),
      updatedOn: new Date(),
    },
  });
};

const privateFields = [
  'passwordHash',
  'signupToken',
  'resetPasswordToken',
];

service.getPublic = (user: $TSFixMe) => {
  return _.omit(user, privateFields);
};

module.exports = service;
