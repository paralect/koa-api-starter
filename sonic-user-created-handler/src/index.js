/* eslint-disable no-console */

const { Ingest } = require('sonic-channel');
const { Kafka } = require('kafkajs');
const { KafkaProcessor } = require('@slizenko/kafka-processor');

const sonic = new Ingest({
  host: process.env.SONIC_HOST,
  port: Number(process.env.SONIC_PORT),
});

const kafka = new Kafka({
  brokers: process.env.KAFKA_BROKERS.split(','),
});

const consumer = kafka.consumer({ groupId: 'sonic-user-created-hanlder' });
const processor = new KafkaProcessor('user', consumer);

async function main() {
  sonic.connect({
    connected() {
      processor.on('user:created', async (message) => {
        const user = message.data.doc;
        try {
          await sonic.push('user', 'default', user._id, `${user.firstName} ${user.lastName} ${user.email}`);
        } catch (error) {
          console.error(error);
        }
      });
    },
  });
  await processor.run();
}

main();
