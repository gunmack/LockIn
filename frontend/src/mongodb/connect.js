import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let cachedDb = null;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the .env file.");
}

const client = new MongoClient(uri);

export async function connectToMongoDB() {
  if (cachedDb) {
    return cachedDb;
  } else {
    try {
      await client.connect();
      console.log("Connected to MongoDB successfully!");
      const db = client.db("sample_mflix"); // Optionally specify the DB name;
      cachedDb = db;
      return db;
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;
    }
  }
}

export async function closeMongoDBConnection() {
  await client.close();
  console.log("Disconnected from MongoDB");
}
