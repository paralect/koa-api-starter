const { Kafka } = require('kafkajs');
const mongo = require('@paralect/node-mongo');
const { KafkaProcessor } = require('@slizenko/kafka-processor');
const { NodeMongoKafkaEmitter } = require('@slizenko/node-mongo-kafka-emitter');

const config = require('./config');

const db = mongo.connect(config.mongo.connection);
const kafka = new Kafka(config.kafka);
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'user-signup-hanlder' });
const processor = new KafkaProcessor('user', consumer);

const userService = db.createService('users', {
  emitter: new NodeMongoKafkaEmitter('user', producer),
});

processor.on('user:signup', async (message) => {
  try {
    await userService.create(message.data);
  } catch (error) {
    console.error(error); // eslint-disable-line no-console
  }
});

async function main() {
  await producer.connect();
  await processor.run();
}

main();
