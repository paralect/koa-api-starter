const { TOKEN_TYPES } = require('app.constants');


const tokenSchema = {
  $jsonSchema: {
    required: ['type', 'value', 'userId'],
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
      type: {
        enum: [TOKEN_TYPES.ACCESS],
      },
      value: {
        type: 'string',
      },
      userId: {
        type: 'string',
      },
      isShadow: {
        bsonType: 'bool',
      },
    },
  },
};

module.exports = tokenSchema;
