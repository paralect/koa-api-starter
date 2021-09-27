import _ from 'lodash';
import path from 'path';
import fs from 'fs';

const env = process.env.APP_ENV || 'development';

// eslint-disable-next-line import/no-mutable-exports
let base = {
  env,
  port: process.env.PORT || 3001,
  socketPort: process.env.SOCKET_IO_PORT || 8082,
  isDev: env === 'development',
  isTest: env === 'test',
};

const envConfig = fs.readFileSync(`src/config/environment/${env}.json`);
const parsedEnvConfig = JSON.parse(envConfig);

base = _.merge(base, parsedEnvConfig || {});

const loadLocalConfig = (name) => {
  const localConfigPath = path.join(path.resolve(), name);
  if (fs.existsSync(localConfigPath)) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const secParam = require(localConfigPath);

    base = _.merge(base, secParam);
    console.log(`loaded ${localConfigPath} config`); // eslint-disable-line no-console
  }
};

// local file can be used to customize any config values during development
if (base.env === 'test') {
  loadLocalConfig('test-local.js');
} else {
  loadLocalConfig('local.js');
}
export default base;
