const MongoDBClient = require('./mongo-client');

// Initialize MongoDB client with connection URI and database name
const Database = new MongoDBClient(`mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PWD}@mongodb`, 'myDatabase');

module.exports = Database;