import displayDB from "@/mongodb/displayDB";
import { closeMongoDBConnection } from "@/mongodb/connect";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await displayDB();
    res.status(200).json({ message: "Collections logged successfully" });
    closeMongoDBConnection();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
