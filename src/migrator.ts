require('app-module-path').addPath(__dirname);

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'migrator'.
const migrator = require('migrations/migrator');

migrator.exec();
