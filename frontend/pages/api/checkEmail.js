import emailExists from "@/mongodb/checkEmail";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const emailFound = await emailExists(email); // Get the result of email existence check
      if (emailFound) {
        console.log("Email exists");
        return res.status(200).json({ exists: true });
      } else {
        console.log("Email does not exist");
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
