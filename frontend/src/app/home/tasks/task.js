"use client";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox, MdClear } from "react-icons/md";
import ConfirmModal from "@/app/home/tasks/confirm";
import AddTask from "@/app/home/tasks/add";

function TaskItem({ task }) {
  const [isChecked, setIsChecked] = useState(false); // State for checkbox toggle
  const [isExpanded, setIsExpanded] = useState(false); // State for expand/collapse

  const toggleCheck = () => setIsChecked((prev) => !prev); // Toggle checkbox
  const toggleExpand = () => setIsExpanded((prev) => !prev); // Toggle expand/collapse

  return (
    <div className="border p-2 rounded-lg">
      {/* Task Header */}
      <div>
        <div className="flex items-center gap-2">
          {isChecked ? (
            <MdCheckBox
              onClick={(e) => e.stopPropagation() || toggleCheck()}
              className="cursor-pointer"
            />
          ) : (
            <MdCheckBoxOutlineBlank
              onClick={(e) => e.stopPropagation() || toggleCheck()}
              className="cursor-pointer"
            />
          )}
          <span
            className="flex justify-between items-center cursor-pointer"
            onClick={toggleExpand} // Toggle expand on click
          >
            <strong>{task.name}</strong>
          </span>
        </div>{" "}
      </div>

      {/* Expanded Details */}
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-screen" : "max-h-0"
        }`}
      >
        {" "}
        {isExpanded && (
          <div className="mt-2  transition-all dureation-300 ease-in-out">
            <p>
              <strong>About:</strong>{" "}
              {task.description ? task.description : "No description"}
            </p>
            <p>
              <strong>Due:</strong>{" "}
              {task.deadline ? task.deadline : "No deadline"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TaskList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

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
    //   description: "This is a detailed description of task 1.",
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
              className="p-2 text-black bg-white rounded-lg hover:bg-gray-300"
            >
              New Task
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
                <div>
                  <button
                    onClick={() => {
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
          message={`Are you sure you want to delete the task: ${
            taskList.find((task) => task.id === taskToDelete)?.name
          }?`}
          onConfirm={() => removeTask(taskToDelete)} // Pass the task to delete
          onCancel={cancelRemoveTask}
        />
      )}
    </div>
  );
}

export default TaskList;
