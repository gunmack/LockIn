import writeToDB from "@/mongodb/write";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    await writeToDB();
    res.status(200).json({ message: "Data written successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
