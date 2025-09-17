"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";


function EditTask({id, onCancel, onSave}) {
  const [task, setTask] = useState(null);
  async function fetchTaskByID() {
    const res = await fetch("/api/fetchList");
    const data = await res.json();
    const filteredTask = data.todos?.tasks.find(
      (task) => task.id === Number(id)
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
        status: task.status
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
      <h2 className="text-xl font-bold text-center">New Task</h2>

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
        <div className="border border-gray-300 rounded-lg p-4 w-full" >
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
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

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [showEditTask, setShowEditTask] = useState(false);

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
    <div className="w-1/2 border p-4 rounded-lg bg-zinc-800 ">
      <div>
        <h1 className="text-2xl text-center font-bold mb-4">{task.title}</h1>
      </div>
      <p className="mb-2 p-4 whitespace-pre-wrap">{task.description}</p>
      <div className="flex flex-row justify-between mt-4">
        <p className="mb-2 p-4">Due: {task.dueDate}</p>
        <p className="mb-2 p-4">Status: {task.status}</p>
      </div>
      <div className="flex flex-row justify-center mt-4">
        <button className=" px-8  text-black bg-white rounded-md text-md p-2 m-2 hover:bg-black hover:text-white transition-all duration-150 ease-in-out"
        onClick={() => setShowEditTask(true)}>
          Edit Task
        </button>
      </div>
      {showEditTask &&
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-4">
          <EditTask
            id={task.id}
            onCancel={() => {
              setShowEditTask(false);
            }}
            onSave = {(updatedTask) => {
              setTask(updatedTask);
            }}
          />
        </div>
      </div>
      }
    </div>
  );
}

