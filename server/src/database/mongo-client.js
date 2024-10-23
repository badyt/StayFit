const { MongoClient } = require('mongodb');

//Mongo Client generic class
class MongoDBClient {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(this.uri);
    this.db = null;
  }

  //connect to mongoDB
  async connect() {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error;
    }
  }

  //disconnect mongoDB
  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      throw error;
    }
  }

  //Insert one document to a collection
  async insertOne(collectionName, document) {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    const collection = this.db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result.insertedId;
  }

  //find one document in a collection by query
  async findOne(collectionName, query) {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    const collection = this.db.collection(collectionName);
    return await collection.findOne(query);
  }

  //update one document to a collection
  async updateOne(collectionName, filter, update) {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    const collection = this.db.collection(collectionName);
    const result = await collection.updateOne(filter, { $set: update });
    return result;
  }

  //find documents in a collection by query with projection and options
  async find(collectionName, query, projection = {}, options = {}) {
    if (!this.db) {
      throw new Error('Database not initialized. Call connect() first.');
    }
    const collection = this.db.collection(collectionName);
    return await collection.find(query, options).project(projection).toArray();
  }
}



module.exports = MongoDBClient;