const { Kafka } = require('kafkajs');

const { KafkaProcessor } = require('./kafka-processor');

const kafka = new Kafka({
  clientId: 'ship',
  brokers: ['kafka:9092'],
});

const processors = {
  user: new KafkaProcessor(kafka, { groupId: 'ship' }, { topic: 'user' }),
};

async function run() {
  await Promise.all(Object.values(processors).map((p) => p.run()));
}

async function send({ event, data, ...record }) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    ...record,
    messages: [
      { value: JSON.stringify({ event, data }) },
    ],
  });
  await producer.disconnect();
}

module.exports = {
  kafka,
  processors,
  run,
  send,
};
