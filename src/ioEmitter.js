import redis from 'redis';
import emmit from 'socket.io-emitter';

import config from './config/index.js';
import logger from './logger.js';

const client = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});
const emitter = emmit(client);

emitter.redis.on('error', (err) => {
  logger.error(`Error publishing to sockets: ${err}`);
});

export default emitter;
