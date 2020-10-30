const { Kafka } = require('kafkajs');
const { nanoid } = require('nanoid');

const config = require('config');

const kafka = new Kafka(config.kafka);

const producer = kafka.producer();

exports.run = async () => {
  await producer.connect();
};

exports.send = async ({ event, data, ...record }) => {
  await producer.send({
    ...record,
    messages: [
      {
        value: JSON.stringify({
          data,
          metadata: {
            _id: nanoid(),
            name: event,
          },
        }),
      },
    ],
  });
};

exports.producer = producer;
