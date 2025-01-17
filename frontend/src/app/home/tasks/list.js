"use client";
import { useState } from "react";

import TaskList from "@/app/home/tasks/task";

export default function DisplayTasks() {
  const [tasks, setTasks] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  // Function to add a task
  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { name: task, id: Date.now() }]);
    setIsAdding(false);
  };

  // // Function to remove a task
  // const removeTask = (taskId) => {
  //   setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  //   setIsModalOpen(false);
  // };

  // // Function to cancel the delete action
  // const cancelRemoveTask = () => {
  //   setIsModalOpen(false);
  //   setTaskToDelete(null); // Clear the task to delete
  // };

  // Function to cancel adding a task
  const cancelAddTask = () => {
    setIsAdding(false);
  };

  return (
    <div>
      {/* {isAdding ? (
        <AddTask onAddTask={addTask} onCancel={cancelAddTask} />
      ) : (
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <button
              onClick={() => setIsAdding(true)}
              className="p-2 text-black bg-white rounded-lg hover:bg-gray-300"
            >
              New Task
            </button>
          </div>
          <TaskList />
        </div>
      )} */}
      {/* 
      {isModalOpen && (
        <ConfirmModal
          message={`Are you sure you want to delete the task: ${
            tasks.find((task) => task.id === taskToDelete)?.name
          }?`}
          onConfirm={() => removeTask(taskToDelete)} // Pass the task to delete
          onCancel={cancelRemoveTask}
        />
      )} */}
      <TaskList />
    </div>
  );
}
