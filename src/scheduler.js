import appModulePath from 'app-module-path';
import path from 'path';

import './scheduler/cron/index.js';

import './scheduler/handlers/action.example.handler.js';

appModulePath.addPath(path.resolve());
