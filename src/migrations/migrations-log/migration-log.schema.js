const schema = {
  $jsonSchema: {
    required: ['companyId', 'startTime', 'finishTime', 'status'],
    properties: {
      _id: {
        type: 'string',
      },
      companyId: {
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
