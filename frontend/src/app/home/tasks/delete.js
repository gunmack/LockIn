"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function DeleteTask({ id, onCancel, onDelete }) {
  const router = useRouter();
  async function handleDeleteTask() {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`/api/deleteTask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: Number(id) }),
        });
        if (res.ok) {
          console.log("Task deleted:", id);
          onCancel(); // close modal
          onDelete(id);
          router.push("/home/tasks");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  }
  return (
    <div className="flex flex-col gap-4 py-4 px-4 text-black text-center">
      <p>Are you sure you want to delete this task?</p>
      <div className="flex justify-center gap-2">
        <button
          className="p-2 text-green-700 bg-white rounded-lg hover:text-white 
                     hover:bg-green-500 hover:px-4 
                     transition-all ease-in-out duration-500"
          onClick={handleDeleteTask}
        >
          Delete
        </button>
        <button
          className="p-2 text-red-700 bg-white rounded-lg hover:text-white 
                     hover:bg-red-500 hover:px-4 
                     transition-all ease-in-out duration-500"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
