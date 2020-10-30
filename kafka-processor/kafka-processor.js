class KafkaProcessor {
  constructor(topic, consumer, options) {
    this.this = topic;
    this.consumer = consumer;
    this.options = options;

    this.listeners = new Map();

    this.run = this.run.bind(this);
    this.process = this.process.bind(this);
  }

  async run() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic });
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
    const { metadata = {}, data = {} } = JSON.parse(message.value.toString());

    const m = {
      data,
      metadata,
      kafka: { topic, partition, message },
    };

    if (this.options.onStart) {
      const response = await this.options.onStart(m).catch(() => {});
      if (response && response.skip) return;
    }

    m.metadata.startProcessingOn = Date.now();

    const results = await Promise.allSettled(
      Array.from(this.listeners.get(m.metadata.name) || [])
        .map((listener) => listener(data)),
    );

    m.metadata.endProcessingOn = Date.now();
    m.metadata.processingDuration = m.metadata.endProcessingOn - m.metadata.startProcessingOn;

    const rejected = results.filter((r) => r.status === 'rejected');

    if (rejected.length > 0) {
      m.metadata.status = 'fail';
      m.metadata.errors = rejected.map((r) => r.value);
      if (this.options.onFail) this.options.onFail(m).catch(() => {});
    } else {
      m.metadata.status = 'success';
      if (this.options.onSuccess) this.options.onSuccess(m).catch(() => {});
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
