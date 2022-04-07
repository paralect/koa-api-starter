// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Migration'... Remove this comment to see the full error message
const Migration = require('migrations/migration');
// const migrationService = require('migrations/migration.service');
//
// const userService = require('resources/user/user.service');

const migration = new Migration(1, 'Example');

// @ts-expect-error ts-migrate(2339) FIXME: Property 'migrate' does not exist on type 'Migrati... Remove this comment to see the full error message
migration.migrate = async () => {
  // const userIds = await userService.distinct('_id', {
  //   isEmailVerified: true,
  // });
  //
  // await migrationService.promiseLimit(userIds, 50, (userId) => userService.updateOne(
  //   { _id: userId },
  //   (old) => ({
  //     ...old,
  //     isEmailVerified: false,
  //   }),
  // ));
};

module.exports = migration;
