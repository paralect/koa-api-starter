import config from 'config';
import { Database, Service } from '@paralect/node-mongo';


const database = new Database(config.mongo.connection, config.mongo.dbName);
database.connect();

// Extended service can be used here.
function createService<T>(collectionName: string, options: $TSFixMe = {}) {
  return new Service<T>(collectionName, database, options);
}

export default {
  database,
  createService,
};
