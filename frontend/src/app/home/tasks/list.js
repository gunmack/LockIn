"use client";
import { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineCheck,
  MdCheckBox,
  MdClear,
  MdOutlineAdd,
  MdModeEdit,
} from "react-icons/md";

import { IoMdArrowDropdown } from "react-icons/io";

import ConfirmModal from "@/app/home/tasks/confirm";
import AddTask from "@/app/home/tasks/add";
import EditTask from "@/app/home/tasks/edit";

function TaskItem({ task }) {

  const [isEditing, setIsEditing] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // State for checkbox toggle
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse

  const toggleCheck = () => setIsChecked((prev) => !prev); // Toggle checkbox
  const toggleExpand = () => setIsExpanded((prev) => !prev); // Toggle expand/collapse

  return (
    <div className="flex flex-row items-center justify-center gap-2 w-full">
      <div>
        {isChecked ? (
          <MdCheckBox
            onClick={() => toggleCheck()}
            className="cursor-pointer"
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => toggleCheck()}
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="border p-2 rounded-lg w-full max-w-2xl mx-auto">
        {/* Task Header */}
        <div>
          <div className="flex items-center gap-2 justify-between">
            <strong>
            {task.name}{" "}
              <button className="inline-flex hover:cursor-pointer" onClick={setIsEditing(true)}>  <MdModeEdit  /></button>
            </strong>
            <div className="flex justify-between items-center">
              <IoMdArrowDropdown
                className={`text-xl transition-transform duration-300 hover:cursor-pointer ${
                  isExpanded ? "rotate-0" : "rotate-90"
                }`}
                onClick={toggleExpand}
              />
            </div>
          </div>
        </div>

        {/* Smooth Transition for Expanded Details */}
        <div
          className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
            isExpanded ? "max-h-[500px]" : "max-h-0"
          }`}
        >
          <div className="mt-2 p-8 break-words ">
            <p>
              <strong>About: </strong> {task.description || "No description"}
            </p>
            <br />
            <p>
              <strong>Due: </strong> {task.deadline || "No deadline"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [taskState, setTaskState] = useState(""); // State for task details

  // Function to remove a task
  const removeTask = (taskId) => {
    setTaskList((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setIsModalOpen(false);
  };

  // Function to cancel the delete action
  const cancelRemoveTask = () => {
    setIsModalOpen(false);
    setTaskToDelete(null); // Clear the task to delete
  };

  // Initial task list with additional fields
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      name: "Sample Task 1",
      description: "This is a detailed description of task 1. ",
      deadline: "2025-01-20",
    },
    {
      id: 2,
      name: "Sample Task 2",
      description: "This is a detailed description of task 2.",
      deadline: "2025-02-15",
    },
  ]);

  const addTask = (taskName, taskDescription, taskDeadline) => {
    setIsAdding(true);
    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription, // You can add default description or let user input
      deadline: taskDeadline, // You can allow the user to set a deadline
    };
    setTaskList((prevTasks) => [...prevTasks, newTask]);
    setIsAdding(false); // Hide the Add Task form after adding the task
  };

  const editTask = (taskId, taskName, taskDescription, taskDeadline) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === taskId
        ? {
            ...task,
            name: taskName,
            description: taskDescription,
            deadline: taskDeadline,
          }
        : task
    );
    setTaskList(updatedTaskList);
  }

  return (
    <div className="flex flex-col gap-8">
   
      {/* Show AddTask component when adding, hide task list */}
      {isAdding ? (
        <AddTask onAddTask={addTask} onCancel={() => setIsAdding(false)} />
      ) : (
        <>
          <div className="flex justify-center">
            <button
              onClick={() => setIsAdding(true)}
              className="flex flex-row justify-center items-center gap-2 p-2 text-green-700
               bg-white rounded-lg hover:text-white hover:bg-green-500 hover:px-4 
               transition-all ease-in-out duration-500"
            >
              <MdOutlineAdd /> New Task
            </button>
          </div>

          {/* Only show task list if not adding */}
          {taskList.length === 0 ? (
            <p>No tasks available</p>
          ) : (
            taskList.map((task) => (
              <div
                key={task.id}
                className="flex flex-row items-center gap-2 pl-8"
              >
                <TaskItem key={task.id} task={task} />
                <div className="flex gap-2">
                  <button
                    className="text-green-500 text-xl hover:text-3xl transition-all 
                    duration-300 ease-in-out"
                    onClick={() => {
                      setTaskState("complete");
                      setIsModalOpen(true);
                      setTaskToDelete(task.id);
                    }}
                  >
                    <MdOutlineCheck />
                  </button>
                  <button
                    className="text-red-500 text-xl hover:text-3xl transition-all 
                    duration-300 ease-in-out"
                    onClick={() => {
                      setTaskState("delete");
                      setIsModalOpen(true);
                      setTaskToDelete(task.id); // Set the task to be deleted
                    }}
                  >
                    <MdClear />
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {isModalOpen && (
        <ConfirmModal
          message={
            taskState === "complete"
              ? `Are you sure you want to mark the task: ${
                  taskList.find((task) => task.id === taskToDelete)?.name
                } as complete?`
              : `Are you sure you want to delete the task: ${
                  taskList.find((task) => task.id === taskToDelete)?.name
                }?`
          }
          onConfirm={() => removeTask(taskToDelete)} // Pass the task to delete
          onCancel={cancelRemoveTask}
        />
      )}
    </div>
  );
}

export default TaskList;
