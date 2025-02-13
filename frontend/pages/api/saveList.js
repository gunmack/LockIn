import saveList from "@/mongodb/saveList";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { userName, name, description, deadline } = req.body;
  try {
    const result = await saveList(userName, name, description, deadline);
    res.status(200).json("Task added successfully");
  } catch (error) {
    console.log("Error saving list:", error);
    res.status(500).json({ error: error.message });
  }
}
