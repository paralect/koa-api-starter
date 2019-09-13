const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

let base = {
  env,
  port: process.env.PORT || 3001,
  isDev: env === 'development',
  isTest: env === 'test',
  landingUrl: 'http://localhost:3000',
  webUrl: 'http://localhost:3002',
  apiUrl: 'http://localhost:3001',
  accessTokenExpiresIn: 3600 * 1000, // 1 hour
  refreshTokenExpiresIn: 3600 * 1000 * 10, // 10 hours
  mongo: {
    connection: 'mongodb://root:rootPassword@localhost:27017/api?authSource=admin',
  },
  redis: {
    host: 'redis',
    port: 6379,
  },
  mailgun: {
    apiKey: 'apiKey',
    domain: 'domain',
  },
  google: {
    clientId: 'clientId',
    clientSecret: 'clientSecret',
    redirectUri: 'redirectUri',
  },
  sessionTimeInMinutes: 30,
};

const envConfig = require(`./${env}.js`); // eslint-disable-line

base = _.merge(base, envConfig || {});

const loadLocalConfig = (name) => {
  const localConfigPath = path.join(__dirname, name);
  if (fs.existsSync(localConfigPath)) {
    base = _.merge(base, require(localConfigPath)); // eslint-disable-line
    console.log(`loaded ${localConfigPath} config`); // eslint-disable-line
  }
};

// local file can be used to customize any config values during development
if (base.env === 'test') {
  loadLocalConfig('test-local.js');
} else {
  loadLocalConfig('local.js');
}
module.exports = base;
