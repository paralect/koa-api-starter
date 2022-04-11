import db from 'db';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

import validateSchema from './migration.schema';

const service = db.createService('__migrationVersion', { validate: validateSchema });
const migrationsPath = path.join(__dirname, 'migrations');
const id = 'migration_version';

const getMigrationNames = () => new Promise((resolve, reject) => {
  fs.readdir(migrationsPath, (err: $TSFixMe, files: $TSFixMe) => {
    if (err) {
      reject(err);
      return;
    }
    resolve(files);
  });
});

const getCurrentMigrationVersion = () => service.findOne({ _id: id })
  .then((doc: $TSFixMe) => {
    if (!doc) {
      return 0;
    }

    return doc.version;
  });

const getMigrations = () => {
  let migrations = null;

  return getMigrationNames()
    .then((names: $TSFixMe) => {
      migrations = names.map((name: $TSFixMe) => {
        const migrationPath = path.join(migrationsPath, name);
        console.dir(migrationPath);
        return require(migrationPath);
      });

      return migrations;
    })
    .catch(err => {
      throw err;
    });
};

const setNewMigrationVersion = (version: $TSFixMe) => service.atomic.findOneAndUpdate({ _id: id }, {
  $set: {
    version,
  },
  $setOnInsert: {
    _id: id,
  },
}, { upsert: true });

const promiseLimit = (documents: any[], limit: $TSFixMe, operator: $TSFixMe) => {
  const chunks = _.chunk(documents, limit);

  return chunks.reduce((init: $TSFixMe, chunk) => {
    return init.then(() => {
      return Promise.all(chunk.map((c) => operator(c)));
    });
  }, Promise.resolve());
};

export default Object.assign(service, {
  getCurrentMigrationVersion,
  getMigrations,
  setNewMigrationVersion,
  promiseLimit,
});

