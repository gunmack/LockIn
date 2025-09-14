export default async function fetchTasks(param) {
  try {
    const res = await fetch("/api/fetchList");
    if (!res.ok) throw new Error("Failed to fetch tasks");
    const data = await res.json();
    const tasksArray = data.todos?.tasks || [];
    const filtered = tasksArray.filter(
      (task) => task.status === param.toString()
    );
    return filtered;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}
