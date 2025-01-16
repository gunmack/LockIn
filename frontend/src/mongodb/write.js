import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";

export default async function writeToDB() {
  try {
    const db = await connectToMongoDB();
    // console.log(db.name);
    const collection = await db.collection("Users");
    const result = await collection.insertOne({
      name: "Randy Orton",
      age: 47,
      email: "r.orton@example.ca", // Provide a unique email
    });
    console.log("Inserted: ", result.insertedId);
  } catch (error) {
    console.error("Error writing to database:", error);
  } finally {
    await closeMongoDBConnection();
  }
}
