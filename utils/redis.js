import redis from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    // Create a Redis client
    this.client = redis.createClient();
    // Log Redis errors to the console
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to the server: ${err.message}`);
    });
    this.connected = false;
    this.client.on('connect', () => {
      this.connected = true;
    });
  }

  isAlive() {
    // Check if the Redis client is connected
    return this.client.connected;
  }

  async get(key) {
    const getAsync = promisify(this.client.get).bind(this.client);
    try {
      const value = await getAsync(key);
      return value;
    } catch (error) {
      console.error(`Error in Redis get operation: ${error.message}`);
      // Handle the error or return a default value if needed
      throw error; // Re-throw the error to propagate it
    }
  }

  async set(key, value, duration) {
    const setAsync = promisify(this.client.set).bind(this.client);
    try {
      await setAsync(key, value, 'EX', duration);
    } catch (error) {
      console.error(`Error in Redis set operation: ${error.message}`);
      // Handle the error if needed
      throw error; // Re-throw the error to propagate it
    }
  }

  async del(key) {
    const delAsync = promisify(this.client.del).bind(this.client);
    try {
      await delAsync(key);
    } catch (error) {
      console.error(`Error in Redis del operation: ${error.message}`);
      // Handle the error if needed
      throw error; // Re-throw the error to propagate it
    }
  }
}

const redisClient = new RedisClient();
export default redisClient;
