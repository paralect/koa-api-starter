module.exports = {
  mongo: {
    connection: 'mongodb://root:rootPassword@mongo:27017/api-development?authSource=admin',
  },
  jwt: {
    secret: 'the_secret',
  },
  redis: {
    host: 'redis',
    port: 6379,
  },
};
