"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((t) => t.id.toString() === id);
        setTask(found);
      });
  }, [id]);

  if (!task) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="mb-2">Description: {task.description}</p>
      <p className="mb-2">Due Date: {task.dueDate}</p>
      <p className="mb-2">Status: {task.status}</p>
    </div>
  );
}
