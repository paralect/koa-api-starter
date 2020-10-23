/* eslint-disable class-methods-use-this */

class NodeMongoKafkaEmitter {
  constructor(_topic, producer) {
    this.topic = _topic;
    this.producer = producer;
  }

  async emit(event, data) {
    await this.producer.send({
      topic: this.topic,
      messages: [
        { value: JSON.stringify({ event: `${this.topic}:${event}`, data }) },
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
