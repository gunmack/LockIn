import addUserToDB from "@/mongodb/addUser";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email, username, password } = req.body;
  try {
    await addUserToDB(email, username, password);
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
