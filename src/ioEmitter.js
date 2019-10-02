const config = require('config');
const logger = require('logger');
const emitter = require('socket.io-emitter')({
  host: config.redis.host,
  port: config.redis.port,
});


emitter.redis.on('error', (err) => {
  logger.error(`Error publishing to sockets: ${err}`);
});

module.exports = emitter;
