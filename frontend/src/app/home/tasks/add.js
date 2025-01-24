"use client";
import { useState } from "react";

export default function AddTask({ onAddTask, onCancel }) {
  // State for the input field
  const [taskInput, setTaskInput] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState(""); // Added deadline state

  // Handle text input changes
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setTaskDescription(e.target.value);
  };
  // Handle deadline input change
  const handleDeadlineChange = (e) => {
    setTaskDeadline(e.target.value);
  };

  // Handle task addition
  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      // Call the parent function to add the task
      onAddTask(taskInput, taskDescription, taskDeadline);
      setTaskInput(""); // Clear input after adding task
      setTaskDescription(""); // Clear description after adding task
      setTaskDeadline(""); // Clear deadline after adding
    }
  };

  return (
    <div className="flex flex-col gap-4 py-4">
      <h2 className="text-2xl font-bold">New Task</h2>
      <div>
        Task name
        <textarea
          type="text"
          value={taskInput}
          onChange={handleInputChange}
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
          onClick={handleAddTask}
          className="p-2 text-green-700 bg-white rounded-lg hover:text-white
           hover:bg-green-500 hover:px-4 
               transition-all ease-in-out duration-500 "
        >
          Add Task
        </button>
        <button
          onClick={onCancel} // Call onCancel to hide AddTask
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
