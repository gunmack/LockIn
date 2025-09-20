"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import EditTask from "@/app/home/tasks/edit";
import DeleteTask from "@/app/home/tasks/delete";

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [showEditTask, setShowEditTask] = useState(false);
  const [showDeleteTask, setShowDeleteTask] = useState(false);

  useEffect(() => {
    async function fetchTaskByID() {
      const res = await fetch("/api/fetchList");
      const data = await res.json();
      console.log("Fetched data:", data);
      const filteredTask = data.todos?.tasks.find(
        (task) => task.id === String(id) // filter inside the array for ID
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
        {/* Past due */}
        {task.dueDate < new Date().toISOString().split("T")[0] && (
          <p className="text-red-500 font-bold mb-2 p-4">{task.dueDate}</p>
        )}
        {/* Due today or later */}
        {task.dueDate >= new Date().toISOString().split("T")[0] && (
          <p className="text-green-500 font-bold mb-2 p-4">{task.dueDate}</p>
        )}

        {task.status === "to-do" && (
          <p className="bg-red-500 text-white m-2 p-4 rounded-md">To-Do</p>
        )}
        {task.status === "in-progress" && (
          <p className="bg-blue-500 text-white m-2 p-4 rounded-md">Active</p>
        )}
        {task.status === "complete" && (
          <p className="bg-green-500 text-white m-2 p-4 rounded-md">Complete</p>
        )}
      </div>
      {task.status !== "complete" && (
        <div className="flex flex-row justify-center mt-4">
          <button
            className=" flex gap-2 px-4 text-black bg-white rounded-md text-md p-2 m-2 hover:bg-black hover:text-white transition-all duration-150 ease-in-out"
            onClick={() => setShowEditTask(true)}
          >
            Edit <FaRegEdit className="text-lg" />
          </button>
          <button
            className=" flex gap-2 px-4 text-black bg-white rounded-md text-md p-2 m-2 hover:bg-black hover:text-white transition-all duration-150 ease-in-out"
            onClick={() => setShowDeleteTask(true)}
          >
            Delete <FaTrashAlt className="text-lg" />
          </button>
        </div>
      )}

      {showEditTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-4">
            <EditTask
              id={task.id}
              onCancel={() => {
                setShowEditTask(false);
              }}
              onSave={(updatedTask) => {
                setTask(updatedTask);
              }}
            />
          </div>
        </div>
      )}
      {showDeleteTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-lg p-4">
            <DeleteTask
              id={task.id}
              onCancel={() => {
                setShowDeleteTask(false);
              }}
              onDelete={() => {
                setTask(null);
                setShowDeleteTask(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
