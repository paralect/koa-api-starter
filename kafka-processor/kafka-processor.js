class KafkaProcessor {
  constructor(topic, consumer, consumerSubscribeTopic = { topic }) {
    this.consumer = consumer;

    this.consumerSubscribeTopic = consumerSubscribeTopic;

    this.listeners = new Map();

    this.event = {
      START_MESSAGE_PROCESSING: 'processor:start-message-processing',
      END_MESSAGE_PROCESSING: 'processor:end-message-processing',
    };

    this.run = this.run.bind(this);
    this.process = this.process.bind(this);
  }

  async run() {
    await this.consumer.connect();
    await this.consumer.subscribe(this.consumerSubscribeTopic);
    await this.consumer.run({
      autoCommitInterval: 5000,
      eachMessage: this.process,
    });
  }

  async stop() {
    await this.consumer.stop();
    this.listeners = new Map();
  }

  async disconnect() {
    await this.stop();
    await this.consumer.disconnect();
  }

  async pause() {
    await this.consumer.pause();
  }

  async unpause() {
    await this.consumer.unpause();
  }

  async process({ topic, partition, message }) {
    const data = JSON.parse(message.value.toString());
    data.kafka = { topic, partition, message };

    const startListeners = this.listeners.get(this.event.START_MESSAGE_PROCESSING);
    if (startListeners) {
      await Promise.all(Array.from(startListeners).map(async (listener) => {
        await listener(data);
      }));
    }

    const start = Date.now();

    const targetListeners = this.listeners.get(data.event);
    if (targetListeners) {
      await Promise.all(Array.from(targetListeners).map(async (listener) => {
        await listener(data);
      }));
    }

    const end = Date.now();

    data.metadata = {
      startProcessingOn: start,
      endProcessingOn: end,
      processingDuration: end - start,
    };

    const endListeners = this.listeners.get(this.event.END_MESSAGE_PROCESSING);
    if (endListeners) {
      await Promise.all(Array.from(endListeners).map(async (listener) => {
        await listener(data);
      }));
    }
  }

  on(event, listener) {
    let listeners = this.listeners.get(event);

    if (!listeners) {
      listeners = new Set();
      this.listeners.set(event, listeners);
    }

    listeners.add(listener);
    return this;
  }

  off(event, listener) {
    const listeners = this.listeners.get(event);
    if (listeners) listeners.delete(listener);
    return this;
  }

  once(eventName, listener) {
    const wrapper = async (...args) => {
      this.removeListener(eventName, wrapper);
      await listener(...args);
    };

    this.addListener(eventName, wrapper);
    return this;
  }
}

exports.KafkaProcessor = KafkaProcessor;
