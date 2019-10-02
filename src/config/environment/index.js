const _ = require('lodash');
const path = require('path');
const fs = require('fs');

const env = process.env.APP_ENV || 'development';

let base = {
  env,
  port: process.env.PORT || 3001,
  socketPort: process.env.SOCKET_PORT || 8082,
  isDev: env === 'development',
  isTest: env === 'test',
  accessTokenExpiresIn: 3600 * 1000, // 1 hour
  refreshTokenExpiresIn: 3600 * 1000 * 10, // 10 hours
};

const envConfig = require(`./${env}.json`); // eslint-disable-line

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
