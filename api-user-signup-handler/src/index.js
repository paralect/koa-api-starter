/* eslint-disable no-console */

const { Kafka } = require('kafkajs');
const mongo = require('@paralect/node-mongo');
const { KafkaProcessor } = require('@slizenko/kafka-processor');
const { NodeMongoKafkaEmitter } = require('@slizenko/node-mongo-kafka-emitter');

const kafka = new Kafka({ brokers: process.env.KAFKA_BROKERS.split(',') });
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'api-user-signup-hanlder' });

const db = mongo.connect(process.env.MONGO_CONNECTION);
const userService = db.createService('users', {
  emitter: new NodeMongoKafkaEmitter('user', producer),
});
const logService = db.createService('api-user-signup-hanlder-log');

const processor = new KafkaProcessor('user', consumer, {
  onStart: async (message) => {
    const exists = await logService.exists({ 'metadata._id': message.metadata._id });
    return { skip: exists };
  },
  onFail: async (message) => {
    await logService.create(message);
  },
  onSuccess: async (message) => {
    await logService.create(message);
  },
});

processor.on('user:signup', async (message) => {
  try {
    await userService.create(message.data);
  } catch (error) {
    console.error(error);
  }
});

async function main() {
  await producer.connect();
  await processor.run();
}

main();
