/* eslint-disable no-console */

const { Kafka } = require('kafkajs');
const mongo = require('@paralect/node-mongo');
const { KafkaProcessor } = require('@slizenko/kafka-processor');
const { NodeMongoKafkaEmitter } = require('@slizenko/node-mongo-kafka-emitter');

const db = mongo.connect(process.env.MONGO_CONNECTION);

const kafka = new Kafka({
  brokers: process.env.KAFKA_BROKERS.split(','),
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'api-user-signup-hanlder' });
const processor = new KafkaProcessor('user', consumer);

const userService = db.createService('users', {
  emitter: new NodeMongoKafkaEmitter('user', producer),
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
