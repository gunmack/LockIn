// pages/api/addToList.js
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const newTask = req.body;

    if (process.env.NODE_ENV === "development") {
      // Local JSON file path
      const filePath = path.join(process.cwd(), "data", "tasks.json");

      // Read current tasks
      const fileData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(fileData);

      // Assign a new ID and add the task
      const taskWithId = { id: data.tasks.length + 1, ...newTask };
      data.tasks.push(taskWithId);

      // Write back to JSON file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(201).json(taskWithId);
    } else {
      // Production: send to remote DB
      const response = await fetch(process.env.REMOTE_TASKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) throw new Error("Failed to add task to DB");
      const savedTask = await response.json();

      res.status(201).json(savedTask);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add task" });
  }
}
