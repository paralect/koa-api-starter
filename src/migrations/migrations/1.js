import Migration from 'migrations/migration';

const migration = new Migration(1, 'Example');

migration.migrate = async () => {};

export default migration;
