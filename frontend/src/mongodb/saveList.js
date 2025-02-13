import { connectToMongoDB, closeMongoDBConnection } from "@/mongodb/connect";

export default async function saveList(userName, name, description, deadline) {
  try {
    const db = await connectToMongoDB();
    // console.log(db.name);
    const collection = await db.collection("Users");

    if (name === "" && description === "" && deadline === "") {
      await collection.updateOne(
        { username: userName },
        { $unset: { tasks: "" } }
      ); // Removes 'tasks' completely
    }

    await collection.updateOne(
      { username: userName },
      { $unset: { tasks: "" } }
    ); // Removes 'tasks' completely
    const result = await collection.updateOne(
      { username: userName }, // Find document by username
      {
        $set: {
          [`tasks.${name}`]: {
            description: description,
            deadline: deadline,
          },
        },
      } // Add newTask to tasks array
    );
    console.log("Modified Count:", result.modifiedCount);
    return { success: true, message: "Task added successfully" };
  } catch (error) {
    console.error("Error writing to database:", error);
  }
}
