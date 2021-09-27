import config from 'config';
import db from '@paralect/node-mongo';

db.connect(config.mongo.connection);

export default db;
