// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('db');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validateSc... Remove this comment to see the full error message
const validateSchema = require('./migration-log.schema.js');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'service'.
const service = db.createService('__migrationLog', { validate: validateSchema });

service.startMigrationLog = (_id: $TSFixMe, startTime: $TSFixMe, migrationVersion: $TSFixMe) => {
  return service.atomic.findOneAndUpdate({ _id }, {
    $set: {
      migrationVersion,
      startTime,
      status: 'running',
    },
    $setOnInsert: {
      _id,
    },
  }, { upsert: true });
};

service.failMigrationLog = (_id: $TSFixMe, finishTime: $TSFixMe, err: $TSFixMe) => service.atomic.update({ _id }, {
  $set: {
    finishTime,
    status: 'failed',
    error: err.message,
    errorStack: err.stack,
  },
});

service.finishMigrationLog = (_id: $TSFixMe, finishTime: $TSFixMe, duration: $TSFixMe) => service.atomic.update({ _id }, {
  $set: {
    finishTime,
    status: 'completed',
    duration,
  },
});

module.exports = service;
