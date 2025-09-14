"use client";
import React, { useState } from "react";
import ConfirmModal from "@/app/home/tasks/confirm";

export default function EditTask({ task, onUpdateTask, onCancel }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskState, setTaskState] = useState("");
  const [taskInput, setTaskInput] = useState(task?.name || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.description || ""
  );
  const [taskDeadline, setTaskDeadline] = useState(task?.deadline || "");

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };
  // Handle deadline input change
  const handleDeadlineChange = (e) => {
    setTaskDeadline(e.target.value);
  };

  // Handle task addition
  const handleSaveTask = () => {
    if (taskInput.trim() !== "") {
      // Call the parent function to add the task
      onUpdateTask(task.id, taskInput, taskDescription, taskDeadline);
    }
  };

  const handleDiscardChanges = () => {
    setTaskInput(task?.name || "");
    setTaskDescription(task?.description || "");
    setTaskDeadline(task?.deadline || "");
    onCancel(); // Hide the Edit Task form
  };

  return (
    <div className="flex flex-col gap-4 py-4 px-4">
      <h2 className="text-2xl font-bold">Edit Task</h2>
      <div>
        Task name
        <textarea
          type="text"
          value={taskInput}
          disabled
          placeholder="Enter task name"
          className=" p-4 border border-gray-300 rounded-lg text-black w-full"
          rows={1}
          cols={25}
        />
      </div>
      <div>
        Task description
        <textarea
          type="text"
          value={taskDescription}
          onChange={handleDescriptionChange}
          placeholder="Enter task description"
          className=" p-4 border border-gray-300 rounded-lg text-black w-full"
          rows={5}
          cols={45}
        />
      </div>
      <div>
        Task deadline
        <input
          type="date"
          value={taskDeadline}
          onChange={handleDeadlineChange}
          placeholder="Enter task deadline"
          className=" p-4 border border-gray-300 rounded-lg text-black w-full"
        />
      </div>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setTaskState("save");
          }} // Call onCancel to hide AddTask
          className="p-2 text-green-700 bg-white rounded-lg hover:text-white
               hover:bg-green-500 hover:px-4 
                   transition-all ease-in-out duration-500 "
        >
          Save Task
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setTaskState("discard");
          }} // Call onCancel to hide AddTask
          className="p-2 text-red-700 bg-white rounded-lg hover:text-white 
              hover:bg-red-500 hover:px-4 
                   transition-all ease-in-out duration-500"
        >
          Cancel
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          message={
            taskState === "save"
              ? `Are you sure you want to SAVE changes made to: ${task.name}`
              : `Are you sure you want to DISCARD changes made to: ${task.name}?`
          }
          onConfirm={
            taskState === "save"
              ? () => handleSaveTask()
              : () => handleDiscardChanges()
          } // Pass the task to delete
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
