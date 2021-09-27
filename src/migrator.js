import appModulePath from 'app-module-path';
import path from 'path';

import config from './config';
import migrator from './migrations/migrator.js';

appModulePath.addPath(path.resolve());

if (!config.isTest) {
  migrator.exec();
}
