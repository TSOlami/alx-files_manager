import redis from 'redis';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = redis.createClient();
    // Log Redis errors to the console
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err.message}`);
    });
  }

  isAlive() {
    // Check if the Redis client is connected
	  return this.client.connected;
  }

  async get(key) {
    return new Promise((resolve, reject) => {
      // Get the value from Redis
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async set(key, value, duration) {
    return new Promise((resolve, reject) => {
      // Set the value in Redis with an expiration (in seconds)
      this.client.setex(key, duration, value, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  async del(key) {
    return new Promise((resolve, reject) => {
      // Delete the value from Redis
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create and export an instance of RedisClient
const redisClient = new RedisClient();
export default redisClient;