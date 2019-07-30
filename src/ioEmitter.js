const config = require('config');
const emitter = require('socket.io-emitter')({
  host: config.redis.host,
  port: config.redis.port,
});

const logger = require('logger');

emitter.redis.on('error', (err) => {
  logger.error(`Error publishing to sockets: ${err}`);
});

module.exports = emitter;
