const redisClient = require('redis-client');
const assert = require('assert');

/*
const redisCacheClient = new RedisCacheClient(redisClient);
const cache = redisCacheClient.child('products');
const name = `key`;
await cache.exists(name);
await cache.get(name);
await cache.set(name, html);
await cache.remove(name);
await cache.removeAll();
*/

class RedisCacheClient {
  constructor(client) {
    this.client = client;
  }

  /**
   * Creates a new child cache
   * @param {*} prefix
   */
  child(prefix, isJson = false) {
    const self = this;
    return {
      /**
       * Remove all entrys from the cache with the root prefix
       */
      removeAll() {
        assert(prefix, 'Cache prefix is required');
        let localKeys = [];
        return new Promise((resolve, reject) => {
          const stream = self.client.scanStream({
            // only returns keys following the pattern of "key*"
            match: `${prefix}*`,
            // returns approximately 100 elements per call
            count: 100,
          });
          let pipeline = self.client.pipeline();

          stream.on('data', (resultKeys) => {
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < resultKeys.length; i++) {
              localKeys.push(resultKeys[i]);
              pipeline.del(resultKeys[i]);
            }
            if (localKeys.length > 100) {
              pipeline.exec();
              localKeys = [];
              pipeline = self.client.pipeline();
            }
          });
          stream.on('error', (err) => reject(err));
          stream.on('end', () => {
            // fin batch
            pipeline.exec(() => resolve(true));
          });
        });
      },
      /**
       * Return the value behind the key
       * @param {string} name
       */
      async get(name) {
        assert(name, 'Cache item name is required');
        const data = await self.client.get(`${prefix}/${name}`);
        return isJson ? JSON.parse(data) : data;
      },
      /**
       * Store the value with a default expiration time of 300 seconds (5min)
       * @param {string} name
       * @param {any} value
       */
      set(name, value, expiredInSec = 300) {
        assert(name, 'Cache item name is required');
        assert(value, 'Cache item value is required');
        return self.client.setex(`${prefix}/${name}`, expiredInSec, isJson ? JSON.stringify(value) : value);
      },
      /**
       * Returns the remaining expiration time of the item
       * @param {string} name
       */
      getExpiration(name) {
        assert(name, 'Cache item name is required');
        return self.client.ttl(`${prefix}/${name}`);
      },
      /**
       * Check if a key exists
       * @param {string} name
       */
      exists(name) {
        assert(name, 'Cache item name is required');
        return self.client.exists(`${prefix}/${name}`);
      },
      /**
       * Remove the item from the store
       * @param {string} name
       */
      remove(name) {
        assert(name, 'Cache item name is required');
        return self.client.unlink([`${prefix}/${name}`]);
      },
    };
  }
}

module.exports = new RedisCacheClient(redisClient);
