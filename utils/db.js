import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || '0.0.0.0';
    const port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';

    console.log(`Connecting to MongoDB at: mongodb://${host}:${port}`);

    const url = `mongodb://${host}:${port}`;
    this.connected = false;
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.connected = true;
        console.log('Connected to MongoDB');
      })
      .catch((error) => console.error('MongoDB Connection Error:', error.message));
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const usersCollection = this.client.db(this.database).collection('users');
    return usersCollection.countDocuments();
  }

  async nbFiles() {
    const filesCollection = this.client.db(this.database).collection('files');
    return filesCollection.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
