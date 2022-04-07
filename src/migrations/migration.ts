// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Migration'... Remove this comment to see the full error message
class Migration {
  description: $TSFixMe;

  version: $TSFixMe;

  constructor(version: $TSFixMe, description: $TSFixMe) {
    this.version = version;
    this.description = description;
  }
}

module.exports = Migration;
