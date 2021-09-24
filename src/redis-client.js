const config = require('config');
const client = require('ioredis').createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

module.exports = client;
