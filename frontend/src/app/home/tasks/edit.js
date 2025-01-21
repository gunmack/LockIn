"use client";
import { useState } from "react";
import ConfirmModal from "@/app/home/tasks/confirm";

export default function EditTask({ task, onUpdateTask, onCancel }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskState, setTaskState] = useState("")

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
    const handleSaveTask = () => {
        if (taskInput.trim() !== "") {
          // Call the parent function to add the task
          onUpdateTask(taskInput, taskDescription, taskDeadline);
          setTaskInput(""); // Clear input after adding task
          setTaskDescription(""); // Clear description after adding task
          setTaskDeadline(""); // Clear deadline after adding
        }
    };

    return (
        <div className="flex flex-col gap-4 py-4">
          <h2 className="text-2xl font-bold">New Task</h2>
          <div>
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
              onClick={() => {setIsModalOpen(true); setTaskState("save")}} // Call onCancel to hide AddTask
              className="p-2 text-green-700 bg-white rounded-lg hover:text-white
               hover:bg-green-500 hover:px-4 
                   transition-all ease-in-out duration-500 "
            >
              Save Task
            </button>
            <button
              onClick={() => {setIsModalOpen(true); setTaskState("discard")}} // Call onCancel to hide AddTask
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
                        ? `Are you sure you want to save changes made to: ${
                            taskList.find((task) => task.id === taskToDelete)?.name
                          }`
                        : `Are you sure you want to discard changes made to: ${
                            taskList.find((task) => task.id === taskToDelete)?.name
                          }?`
                    }
                    onConfirm={() => handleSaveTask} // Pass the task to delete
                    onCancel={onCancel}
                  />
                )}
        </div>
    );
}