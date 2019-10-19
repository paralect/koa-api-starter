const db = require('db');

const schema = require('./migration-log.schema.js');


const service = db.createService('__migrationLog', schema);

service.startMigrationLog = (_id, startTime, migrationVersion) => {
  return service.findOneAndUpdate({ _id }, {
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

service.failMigrationLog = (_id, finishTime, err) => service.update({ _id }, {
  $set: {
    finishTime,
    status: 'failed',
    error: err.message,
    errorStack: err.stack,
  },
});

service.finishMigrationLog = (_id, finishTime, duration) => service.update({ _id }, {
  $set: {
    finishTime,
    status: 'completed',
    duration,
  },
});

module.exports = service;
