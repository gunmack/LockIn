"use client";
import React, { useState, useEffect } from "react";

export default function EditTask({ id, onCancel, onSave }) {
  const [task, setTask] = useState(null);
  async function fetchTaskByID() {
    const res = await fetch("/api/fetchList");
    const data = await res.json();
    const filteredTask = data.todos?.tasks.find(
      (task) => task.id === String(id)
    );
    setTask(filteredTask);
  }
  useEffect(() => {
    fetchTaskByID();
  }, [id]);

  async function handleSaveTask() {
    if (task.description.trim() !== "" && task.dueDate) {
      const updatedTask = {
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        id: task.id,
        status: task.status,
      };
      try {
        const res = await fetch(`/api/saveTask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        });
        if (res.ok) {
          const savedTask = await res.json();
          console.log("Task updated:", savedTask);
          setTask(updatedTask);
          console.log("Task after update:", task);
          onCancel(); // close modal
          onSave(updatedTask);
        }
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  }

  if (!task) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="flex flex-col gap-4 py-4 px-4">
      <h2 className="text-xl text-black font-bold text-center">Edit Task</h2>

      <div className="text-black text-md">
        Task name
        <div className="text-black text-lg font-bold border border-gray-300 rounded-lg p-4 w-full ">
          {task.title}
        </div>
      </div>

      <div className="text-black text-md">
        Task description
        <div>
          <textarea
            className="text-black text-lg border border-gray-300 rounded-lg p-4 w-full"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            rows={5}
          />
        </div>
      </div>

      <div className="text-black text-md">
        Task deadline
        <div className="border border-gray-300 rounded-lg p-4 w-full">
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          />
        </div>
      </div>
      <div className="text-black text-md">
        Task status
        <div className="border border-gray-300 rounded-lg p-4 w-full flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="to-do"
              checked={task.status === "to-do"}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            />
            To-Do
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="in-progress"
              checked={task.status === "in-progress"}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            />
            In Progress
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="complete"
              checked={task.status === "complete"}
              onChange={(e) => setTask({ ...task, status: e.target.value })}
            />
            Complete
          </label>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={handleSaveTask}
          className="p-2 text-green-700 bg-white rounded-lg hover:text-white 
                       hover:bg-green-500 hover:px-4 
                       transition-all ease-in-out duration-500"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="p-2 text-red-700 bg-white rounded-lg hover:text-white 
                       hover:bg-red-500 hover:px-4 
                       transition-all ease-in-out duration-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
