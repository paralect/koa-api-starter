import Migration from 'migrations/migration';
import migrationService from 'migrations/migration.service';
import userService from 'resources/user/user.service';

const migration = new Migration(1, 'Example');

migration.migrate = async () => {
  const userIds = await userService.distinct('_id', {
    isEmailVerified: true,
  });
  
  await migrationService.promiseLimit(userIds, 50, (userId: string) => userService.update({ _id: userId },
    () => ({
      isEmailVerified: false,
    }),
  ));
};

export default migration;
