const { TOKEN_TYPES } = require('app.constants');


const tokenSchema = {
  $jsonSchema: {
    required: ['type', 'value', 'expireAt', 'userId'],
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
        enum: [TOKEN_TYPES.REFRESH, TOKEN_TYPES.ACCESS],
      },
      value: {
        type: 'string',
      },
      expireAt: {
        bsonType: 'date',
      },
      userId: {
        type: 'string',
      },
    },
  },
};

module.exports = tokenSchema;
