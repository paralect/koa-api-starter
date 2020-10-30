/* eslint-disable no-console */

const mongo = require('@paralect/node-mongo');
const { Ingest } = require('sonic-channel');
const { Kafka } = require('kafkajs');
const { KafkaProcessor } = require('@slizenko/kafka-processor');

const sonic = new Ingest({
  host: process.env.SONIC_HOST,
  port: Number(process.env.SONIC_PORT),
});

const kafka = new Kafka({ brokers: process.env.KAFKA_BROKERS.split(',') });
const consumer = kafka.consumer({ groupId: 'sonic-user-created-hanlder' });

const db = mongo.connect(process.env.MONGO_CONNECTION);
const logService = db.createService('sonic-user-created-handler-log');

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

processor.on('user:created', async ({ data: user }) => {
  try {
    await sonic.push('user', 'default', user._id, `${user.firstName} ${user.lastName} ${user.email}`);
  } catch (error) {
    console.error(error);
  }
});

async function main() {
  sonic.connect({
    async connected() {
      await processor.run();
    },
  });
}

main();
