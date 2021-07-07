const config = require('config');
const logger = require('logger');
const client = require('redis-client');
const emitter = require('socket.io-emitter')(client);

emitter.redis.on('error', (err) => {
  logger.error(`Error publishing to sockets: ${err}`);
});

module.exports = emitter;
