import db from '@paralect/node-mongo';

import config from './config/index.js';

const connectedDB = db.connect(config.mongo.connection);

export default connectedDB;
