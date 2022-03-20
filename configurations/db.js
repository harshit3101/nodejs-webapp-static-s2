const { MongoClient, ServerApiVersion } = require('mongodb');

// enrionment vairbale
const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;


const mongoClient = new MongoClient(MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = mongoClient;