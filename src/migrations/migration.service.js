import db from 'db';
import fs from 'fs';
import path from 'path';
import validateSchema from './migration.schema';

const service = db.createService('__migrationVersion', { validate: validateSchema });
const migrationsPath = path.join(path.resolve(), 'migrations');
const _id = 'migration_version';

const getMigrationNames = () => new Promise((resolve, reject) => {
  fs.readdir(migrationsPath, (err, files) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(files);
  });
});

service.getCurrentMigrationVersion = () => service.findOne({ _id })
  .then((doc) => {
    if (!doc) {
      return 0;
    }

    return doc.version;
  });

service.getMigrations = () => {
  let migrations = null;

  return getMigrationNames().then((names) => {
    migrations = names.map((name) => {
      const migrationPath = path.join(migrationsPath, name);
      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(migrationPath);
    });

    return migrations;
  }).catch((err) => {
    throw err;
  });
};

service.setNewMigrationVersion = (version) => service.atomic.findOneAndUpdate({ _id }, {
  $set: {
    version,
  },
  $setOnInsert: {
    _id,
  },
}, { upsert: true });

export default service;
