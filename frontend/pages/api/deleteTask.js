import fs from "fs";
import path from "path";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }
    try {
        const { id } = req.body;
        if (process.env.NODE_ENV === "development") {
            // Local JSON file path
            const filePath = path.join(process.cwd(), "data", "tasks.json");
            // Read current tasks
            const fileData = fs.readFileSync(filePath, "utf-8");
            const data = JSON.parse(fileData);
            // Filter out the task to be deleted
            data.tasks = data.tasks.filter((task) => task.id !== id);
            // Write updated tasks back to file
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        }
        else {
            // Production: send delete request to remote DB
            const response = await fetch(`${process.env.REMOTE_TASKS_URL}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to delete task on DB");
            await response.json();
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
    }
}