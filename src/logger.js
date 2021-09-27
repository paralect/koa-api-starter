import { createConsoleLogger } from '@paralect/common-logger';

import config from './config/index.js';

export default createConsoleLogger({ isDev: config.isDev });
