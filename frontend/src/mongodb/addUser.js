import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";

export default async function addUserToDB(email, username, password) {
  try {
    const db = await connectToMongoDB();
    // console.log(db.name);
    const collection = await db.collection("Users");
    const result = await collection.insertOne({
      email: email,
      username: username,
      password: password, // Provide a unique email
    });
    console.log("User added with ID: ", result.insertedId);
  } catch (error) {
    console.error("Error writing to database:", error);
  } finally {
    await closeMongoDBConnection();
  }
}
