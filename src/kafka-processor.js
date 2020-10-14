class KafkaProcessor {
  constructor(kafka, consumerConfig, consumerSubscribeTopic) {
    this.kafka = kafka;

    this.consumerConfig = consumerConfig;
    this.consumer = this.kafka.consumer(this.consumerConfig);

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

  on(eventName, listener) {
    let listeners = this.listeners.get(eventName);

    if (!listeners) {
      listeners = new Set();
      this.listeners.set(eventName, listeners);
    }

    listeners.add(listener);
  }

  off(eventName, listener) {
    const listeners = this.listeners.get(eventName);
    if (!listeners) return;

    listeners.delete(listener);
  }
}

exports.KafkaProcessor = KafkaProcessor;
