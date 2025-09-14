"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTaskByID() {
      const res = await fetch("/api/fetchList");
      const data = await res.json();
      console.log("Fetched data:", data);
      const filteredTask = data.todos?.tasks.find(
        (task) => task.id === Number(id) // filter inside the array for ID
      );
      setTask(filteredTask);
    }
    fetchTaskByID();
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
