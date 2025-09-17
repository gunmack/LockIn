"use client";
import React, { useState } from "react";

export default function AddTask({ onCancel, onTaskAdded }) {
  const [taskInput, setTaskInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");

  const handleAddTask = async () => {
    if (taskInput.trim() !== "" && taskDeadline) {
      const newTask = {
        title: taskInput,
        description: taskDescription,
        dueDate: taskDeadline,
        status: "to-do",
      };

      try {
        const res = await fetch("/api/addTask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });

        if (res.ok) {
          const savedTask = await res.json();
          console.log("Task added:", savedTask);

          // notify parent so UI updates
          if (onTaskAdded) {
            onTaskAdded(savedTask);
          }

          // clear inputs
          setTaskInput("");
          setTaskDescription("");
          setTaskDeadline("");

          // close modal
          if (onCancel) {
            onCancel();
          }
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-4">
      <h2 className="text-xl font-bold text-center">New Task</h2>

      <div>
        Task name
        <textarea
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task name"
          className="p-4 border border-gray-300 rounded-lg text-black w-full"
          rows={1}
        />
      </div>

      <div>
        Task description
        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Enter task description"
          className="p-4 border border-gray-300 rounded-lg text-black w-full"
          rows={5}
        />
      </div>

      <div>
        Task deadline
        <input
          type="date"
          value={taskDeadline}
          onChange={(e) => setTaskDeadline(e.target.value)}
          className="p-4 border border-gray-300 rounded-lg text-black w-full"
        />
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={handleAddTask}
          className="p-2 text-green-700 bg-white rounded-lg hover:text-white 
                     hover:bg-green-500 hover:px-4 
                     transition-all ease-in-out duration-500"
        >
          Add
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
