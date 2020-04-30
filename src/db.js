const config = require('config');
const db = require('@paralect/node-mongo').connect(config.mongo.connection);


module.exports = db;
module.exports.waitForConnection = new Promise((res, rej) => {
  db.then(() => res()).catch(() => rej());
});
