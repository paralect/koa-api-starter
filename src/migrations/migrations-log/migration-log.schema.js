const schema = {
  $jsonSchema: {
    required: ['startTime', 'status', 'migrationVersion'],
    properties: {
      _id: {
        type: 'string',
      },
      startTime: {
        bsonType: 'date',
      },
      finishTime: {
        bsonType: 'date',
      },
      status: {
        type: 'string',
      },
      error: {
        type: 'string',
      },
      errorStack: {
        type: 'string',
      },
      duration: {
        type: 'string',
      },
      migrationVersion: {
        type: 'number',
      },
    },
  },
};

module.exports = schema;
