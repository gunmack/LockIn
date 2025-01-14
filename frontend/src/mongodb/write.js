import MongoClient from "mongodb";

const uri = process.env.MONGODB_URI;

export default async function writeToDB() {
  try {
    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db("LockIn");
    const collection = db.collection("users");
    const result = await collection.insertOne({
      name: "John Doe",
      age: 30,
    });
    console.log("Inserted: ", result.insertedId);

    await client.close();
  } catch (error) {
    console.error("Error writing to database:", error);
  }
}
