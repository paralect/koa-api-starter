const client = require('redis').createClient({
  host: config.redis.host,
  port: config.redis.port,
  password: config.redis.password,
});

module.exports = client;
