import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";

export default async function emailExists(email) {
  try {
    const db = await connectToMongoDB();
    const collection = db.collection("Users");
    const user = await collection.findOne({ email: email });
    if (user) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error confirming email:", error);
    return false;
  } finally {
    await closeMongoDBConnection();
  }
}
