import { configUtil } from 'utils';

import { COOKIES } from 'app.constants';
import developmentConfig from './development.json';

const env = process.env.APP_ENV || 'development';

const base = {
  env,
  port: process.env.PORT || 3001,
  isDev: env === 'development',
  accessTokenName: `${env}.${COOKIES.ACCESS_TOKEN}`,
  ...developmentConfig,
};

const config = configUtil.loadConfig(base, env, __dirname);

export default config;
