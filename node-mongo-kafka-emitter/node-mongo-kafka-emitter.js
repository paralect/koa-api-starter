/* eslint-disable class-methods-use-this */

const { nanoid } = require('nanoid');

class NodeMongoKafkaEmitter {
  constructor(_topic, producer) {
    this.topic = _topic;
    this.producer = producer;
  }

  async emit(event, data) {
    await this.producer.send({
      topic: this.topic,
      messages: [
        {
          value: JSON.stringify({
            data,
            metadata: {
              _id: nanoid(),
              name: `${this.topic}:${event}`,
            },
          }),
        },
      ],
    });
  }

  on() {
    throw new Error('Use kafka-processor');
  }

  once() {
    throw new Error('Use kafka-processor');
  }
}

exports.NodeMongoKafkaEmitter = NodeMongoKafkaEmitter;
