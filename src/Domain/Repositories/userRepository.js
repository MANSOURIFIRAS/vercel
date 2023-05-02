// infrastructure/repositories/mongo-user-repository.js

const { MongoClient } = require('mongodb');

class MongoUserRepository {
  constructor(mongoUri) {
    this.mongoUri = mongoUri;
    this.mongoClient = new MongoClient(mongoUri, { useNewUrlParser: true });
  }

  async connect() {
    await this.mongoClient.connect();
  }

  async addUser(user) {
    const db = this.mongoClient.db();
    const collection = db.collection('users');
    await collection.insertOne(user);
  }
}

module.exports = MongoUserRepository;