import db from 'db';

import schema from './migration-log.schema';

const service = db.createService('__migrationLog', { schema });

const startMigrationLog = (_id: $TSFixMe, startTime: $TSFixMe, migrationVersion: $TSFixMe) => {
  return service.atomic.findOneAndUpdate(
    { _id },
    {
      $set: {
        migrationVersion,
        startTime,
        status: 'running',
      },
      $setOnInsert: {
        _id,
      },
    },
    { upsert: true },
  );
};

const failMigrationLog = (_id: $TSFixMe, finishTime: $TSFixMe, err: $TSFixMe) =>
  service.atomic.updateMany(
    { _id },
    {
      $set: {
        finishTime,
        status: 'failed',
        error: err.message,
        errorStack: err.stack,
      },
    },
  );

const finishMigrationLog = (_id: $TSFixMe, finishTime: $TSFixMe, duration: $TSFixMe) =>
  service.atomic.updateMany(
    { _id },
    {
      $set: {
        finishTime,
        status: 'completed',
        duration,
      },
    },
  );

export default { startMigrationLog, failMigrationLog, finishMigrationLog };
