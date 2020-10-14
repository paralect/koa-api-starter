const KafkaJS = require('kafkajs');

const { KafkaProcessor } = require('./kafka-processor');

class Kafka {
  constructor(config) {
    this.kafka = new KafkaJS.Kafka(config);

    this.producer = this.kafka.producer();
    this.processors = {};
  }

  addProcessor(topic, consumerConfig, subscribeConfig = { topic }) {
    if (this.processors[topic]) {
      throw new Error(`Processor for "${topic}" topic already exists`);
    }

    this.processors[topic] = new KafkaProcessor(this.kafka, consumerConfig, subscribeConfig);
    return this;
  }

  async run() {
    await this.producer.connect();
    await Promise.all(Object.values(this.processors).map((p) => p.run()));
  }

  async send({ event, data, ...record }) {
    await this.producer.send({
      ...record,
      messages: [
        { value: JSON.stringify({ event, data }) },
      ],
    });
  }
}

const kafka = new Kafka({ clientId: 'ship', brokers: ['kafka:9092'] });

kafka.addProcessor('user', { groupId: 'ship' });

module.exports = kafka;
