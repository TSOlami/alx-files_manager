import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = (process.env.DB_HOST) ? process.env.DB_HOST : 'localhost';
    const port = (process.env.DB_PORT) ? process.env.DB_PORT : 27017;
    this.database = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : 'files_manager';

    const url = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.connected = true;
    }).catch((error) => console.log(error.message));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    await this.client.connect();
    const usersCollection = await this.client.db.collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    await this.client.connect();
    const filesCollection = await this.client.db.collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
