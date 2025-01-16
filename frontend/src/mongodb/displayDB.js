import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";

export default async function displayDB() {
  try {
    const db = await connectToMongoDB();
    const collections = await db.listCollections().toArray();
    console.log("Reading database...");
    console.log(
      "Collections:",
      await Promise.all(
        collections.map(async (collection) => {
          const collectionName = collection.name;
          const collectionData = await db
            .collection(collectionName)
            .find()
            .toArray();
          return {
            name: collectionName,
            length: collectionData.length,
          };
        })
      )
    );
  } catch (error) {
    console.error("Error displaying collections:", error);
  } finally {
    await closeMongoDBConnection();
  }
}
