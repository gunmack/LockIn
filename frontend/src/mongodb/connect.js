import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const db_name = process.env.MONGO_DB_NAME;
let cacheClient = null;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the .env file.");
}

export async function connectToMongoDB() {
  let client = null;
  if (cacheClient === null) {
    console.log("Creating new MongoDB connection");
    client = new MongoClient(uri);
  } else {
    console.log("Using existing MongoDB connection");
    client = cacheClient;
  }
  try {
    await client.connect();
    cacheClient = client;
    console.log("Connected to MongoDB successfully!");
    const db = client.db(db_name); // Optionally specify the DB name;
    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

export async function closeMongoDBConnection() {
  const client = cacheClient;
  if (client === null) {
    console.log("No active MongoDB connection to close");
    return;
  } else {
    await client.close();
    console.log("Closed connection to MongoDB");
  }
}
