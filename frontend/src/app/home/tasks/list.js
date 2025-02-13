"use client";
import { useState } from "react";
import {
  MdCheckBoxOutlineBlank,
  MdOutlineCheck,
  MdCheckBox,
  MdClear,
  MdOutlineAdd,
  MdModeEdit,
  MdSave,
} from "react-icons/md";

import { IoMdArrowDropdown } from "react-icons/io";

import ConfirmModal from "@/app/home/tasks/confirm";
import AddTask from "@/app/home/tasks/add";
import EditTask from "@/app/home/tasks/edit";
import saveList from "@/app/home/tasks/saveList";

function TaskItem({ task }) {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox toggle
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse

  const toggleCheck = () => setIsChecked((prev) => !prev); // Toggle checkbox
  const toggleExpand = () => setIsExpanded((prev) => !prev); // Toggle expand/collapse

  return (
    <div className="flex flex-row gap-2 w-full">
      {/* <div className="flex items-center justify-center">
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
      </div> */}
      <div className="flex flex-row items-center justify-center gap-2 w-full bg-white text-black rounded-md">
        <div className=" p-2 rounded-lg w-full max-w-2xl mx-auto">
          {/* Task Header */}
          <div className="flex ">
            <div
              // onClick={toggleExpand}
              className=" flex gap-2 justify-center w-full "
            >
              <strong className="cursor-pointer" onClick={toggleExpand}>
                {task.name}{" "}
              </strong>
              {/* <div>
                <IoMdArrowDropdown
                  className={`text-xl transition-transform duration-700  ${
                    isExpanded ? "rotate-0" : "rotate-90 delay-500"
                  }`}
                />
              </div> */}
            </div>
          </div>

          {/* Smooth Transition for Expanded Details */}
          <div
            className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
              isExpanded ? "max-h-[500px]" : "max-h-0"
            } `}
          >
            <div className="mt-2 p-8 break-words ">
              <p>{task.description || "No description"}</p>
              <br />
              <p>
                <strong>Due: </strong> {task.deadline || "No deadline"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function saveTaskList(taskList, userName) {
  // Save the task list to the server
  if (taskList.length > 0) {
    taskList.forEach((task) => {
      saveList(userName, task.name, task.description, task.deadline);
    });
  } else {
    saveList(userName, "", "", "");
  }
}

export default function TaskList({ userName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [taskState, setTaskState] = useState(""); // State for task details
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

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
    // {
    //   id: 1,
    //   name: "Sample Task 1",
    //   description: "This is a detailed description of task 1. ",
    //   deadline: "2025-01-20",
    // },
    // {
    //   id: 2,
    //   name: "Sample Task 2",
    //   description: "This is a detailed description of task 2.",
    //   deadline: "2025-02-15",
    // },
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
    setIsEditing(false);
    setTaskList(updatedTaskList);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Show AddTask component when adding, hide task list */}
      {isEditing && !isAdding && (
        <EditTask
          task={taskList.find((task) => task.id === taskToEdit)}
          onUpdateTask={editTask}
          onCancel={() => setIsEditing(false)}
        />
      )}

      {isAdding && !isEditing && (
        <AddTask onAddTask={addTask} onCancel={() => setIsAdding(false)} />
      )}

      {!isAdding && !isEditing && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center font-bold py-4 text-2xl">
            {userName}&apos;s Tasks
          </h1>
          <div className="flex justify-center p-2 pb-8 gap-4 ">
            <button
              onClick={() => setIsAdding(true)}
              className="flex flex-row justify-center items-center gap-2 p-2 text-green-700
               bg-white rounded-lg hover:text-white hover:bg-green-500 hover:px-4 
               transition-all ease-in-out duration-500"
            >
              <MdOutlineAdd /> New Task
            </button>
            <button
              onClick={() => saveTaskList(taskList, userName)}
              className="flex flex-row justify-center items-center gap-2 p-2 text-green-700
               bg-white rounded-lg hover:text-white hover:bg-green-500 hover:px-4 
               transition-all ease-in-out duration-500"
            >
              <MdSave /> Save Tasks
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-8 ">
            {/* Only show task list if not adding */}
            {taskList.length === 0 ? (
              <p className="text-center">Add some tasks to track!!</p>
            ) : (
              taskList.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col items-center gap-2 w-2/3 bg-black p-2 rounded-lg"
                >
                  <TaskItem key={task.id} task={task} />
                  <div className="flex justify-between w-full">
                    <div className="flex flex-row gap-2">
                      <button
                        className="text-white bg-blue-500 rounded-sm p-0.5 text-xl hover:bg-blue-600 transition-all 
                    duration-300 ease-in-out"
                        onClick={() => {
                          setIsEditing(true);
                          setTaskToEdit(task.id);
                        }}
                      >
                        <MdModeEdit />
                      </button>
                    </div>
                    <div className="flex flex-row gap-2">
                      <button
                        className="text-white bg-green-500 rounded-sm p-0.5 text-xl hover:bg-green-600 transition-all 
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
                        className="text-white bg-red-500 rounded-sm p-0.5 text-xl hover:bg-red-600 transition-all 
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
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <ConfirmModal
          message={
            taskState === "complete"
              ? `Are you sure you want to mark the task: ${
                  taskList.find((task) => task.id === taskToDelete)?.name
                } as COMPLETE?`
              : `Are you sure you want to DELETE the task: ${
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
