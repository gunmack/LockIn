// pages/api/fetchList.js
export default async function handler(req, res) {
  try {
    let tasks;

    if (process.env.NODE_ENV === "development") {
      // Read local JSON in dev
      const fs = await import("fs");
      const path = await import("path");
      const filePath = path.join(process.cwd(), "data", "tasks.json");
      const fileData = fs.readFileSync(filePath, "utf-8");
      tasks = JSON.parse(fileData);
    } else {
      // Fetch from remote database in production
      const response = await fetch(process.env.REMOTE_TASKS_URL);
      if (!response.ok) throw new Error("Failed to fetch from DB");
      tasks = await response.json();
    }

    res.status(200).json({ todos: tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
}
