class NodeMongoKafkaEmitter {
  constructor(_topic, _kafka, _logger = console) {
    this.topic = _topic;
    this.kafka = _kafka;
    this.logger = _logger;

    this.processor = this.kafka.processors[this.topic];
    if (!this.processor) {
      throw new Error(`Processor for "${this.topic}" topic doesn't exist`);
    }
  }

  castEvent(event) {
    return `${this.topic}:${event}`;
  }

  async emit(event, data) {
    try {
      await this.kafka.send({
        topic: this.topic,
        event: this.castEvent(event),
        data,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  on(event, listener) {
    this.processor.on(this.castEvent(event), async (message) => {
      await listener(message.data);
    });
  }

  once(event, listener) {
    this.processor.once(this.castEvent(event), async (message) => {
      await listener(message.data);
    });
  }
}

module.exports = NodeMongoKafkaEmitter;
