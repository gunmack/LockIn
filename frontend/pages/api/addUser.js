import addUserToDB from "@/mongodb/addUser";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email, username, password } = req.body;
  let hashedPassword = await bcrypt.hash(password, 10);
  try {
    await addUserToDB(email, username, hashedPassword);
    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
