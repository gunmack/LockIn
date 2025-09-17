import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const updatedTask = req.body;

    if (process.env.NODE_ENV === "development") {
      // Local JSON file path
      const filePath = path.join(process.cwd(), "data", "tasks.json");

      // Read current tasks
      const fileData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(fileData);
      
      // Find and update the task
      const taskIndex = data.tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        data.tasks[taskIndex] = updatedTask;
      }

      // Write updated tasks back to file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    else {
        // Production: send to remote DB
        const response = await fetch(process.env.REMOTE_TASKS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) throw new Error("Failed to update task on DB");
      const updatedTask = await response.json();

      res.status(201).json(updatedTask);
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
}
