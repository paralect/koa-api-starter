const schema = {
  $jsonSchema: {
    required: ['version'],
    properties: {
      _id: {
        type: 'string',
      },
      createdOn: {
        bsonType: 'date',
      },
      updatedOn: {
        bsonType: 'date',
      },
      version: {
        type: 'number',
      },
    },
  },
};

module.exports = schema;
