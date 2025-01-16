import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const db_name = process.env.MONGO_DB_NAME;

if (!uri) {
  throw new Error("MONGODB_URI is not defined in the .env file.");
}

const client = new MongoClient(uri);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
    const db = client.db(db_name); // Optionally specify the DB name;
    return db;
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

export async function closeMongoDBConnection() {
  await client.close();
  console.log("Closed connection to MongoDB");
}
