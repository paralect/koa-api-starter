// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'db'.
const db = require('db');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fs'.
const fs = require('fs');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'path'.
const path = require('path');
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
const _ = require('lodash');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'validateSc... Remove this comment to see the full error message
const validateSchema = require('./migration.schema');

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'service'.
const service = db.createService('__migrationVersion', { validate: validateSchema });
const migrationsPath = path.join(__dirname, 'migrations');
const _id = 'migration_version';

const getMigrationNames = () => new Promise((resolve, reject) => {
  fs.readdir(migrationsPath, (err: $TSFixMe, files: $TSFixMe) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(files);
  });
});

service.getCurrentMigrationVersion = () => service.findOne({ _id })
  .then((doc: $TSFixMe) => {
    if (!doc) {
      return 0;
    }

    return doc.version;
  });

service.getMigrations = () => {
  let migrations = null;

  return getMigrationNames().then((names) => {
    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    migrations = names.map((name: $TSFixMe) => {
      const migrationPath = path.join(migrationsPath, name);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(migrationPath);
    });

    return migrations;
  }).catch((err) => {
    throw err;
  });
};

service.setNewMigrationVersion = (version: $TSFixMe) => service.atomic.findOneAndUpdate({ _id }, {
  $set: {
    version,
  },
  $setOnInsert: {
    _id,
  },
}, { upsert: true });

service.promiseLimit = (documents = [], limit: $TSFixMe, operator: $TSFixMe) => {
  const chunks = _.chunk(documents, limit);

  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  return chunks.reduce((init, chunk) => {
    return init.then(() => {
      return Promise.all(chunk.map((c) => operator(c)));
    });
  }, Promise.resolve());
};

module.exports = service;
