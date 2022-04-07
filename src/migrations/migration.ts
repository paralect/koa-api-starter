class Migration {
  description?: string;

  version: number;

  constructor(version: number, description?: string) {
    this.version = version;
    this.description = description;
  }

  migrate: $TSFixMe;
}

export default Migration;
