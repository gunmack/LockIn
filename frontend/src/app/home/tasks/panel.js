"use client";
import { useState } from "react";
import TodoList from "@/app/home/tasks/toDo";
import InProgress from "@/app/home/tasks/inProgress";
import Completed from "@/app/home/tasks/completed";
import { MdOutlineAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { RiProgress6Line } from "react-icons/ri";
import { IoIosDoneAll } from "react-icons/io";
export default function TaskPanel() {
  const [activeTab, setActiveTab] = useState("todo");

  return (
    <div className=" flex flex-row rounded-lg bg-black p-2 ">
      <div className="flex flex-col justify-center bg-zinc-500 pr-4 ">
        <button
          className=" w-full text-black rounded-lg p-2 m-2 text-md transition-all duration-300 ease-in-out 
            bg-gray-300 hover:bg-green-600"
        >
          <MdOutlineAdd className="inline-flex items-center justify-center mb-1" />{" "}
          New
        </button>
        <button
          className={` w-full text-black rounded-md text-md  p-2 m-2 transition-all duration-300 ease-in-out ${
            activeTab === "todo"
              ? "bg-red-500 "
              : "bg-gray-300 hover:bg-red-600"
          }`}
          onClick={() => setActiveTab("todo")}
        >
          <LuListTodo className="inline-flex items-center justify-center mb-1" />{" "}
          To-do
        </button>
        <button
          className={`w-full text-black rounded-md text-md p-2 m-2  transition-all duration-300 ease-in-out ${
            activeTab === "in-progress"
              ? "bg-blue-500 "
              : "bg-gray-300 hover:bg-blue-600 "
          }`}
          onClick={() => setActiveTab("in-progress")}
        >
          <RiProgress6Line className="inline-flex items-center justify-center mb-1" />{" "}
          Active
        </button>
        <button
          className={`w-full text-black rounded-md p-2 m-2 text-md  transition-all duration-300 ease-in-out ${
            activeTab === "completed"
              ? "bg-green-500 "
              : "bg-gray-300 hover:bg-green-600"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          <IoIosDoneAll className="inline-flex items-center justify-center mb-1" />{" "}
          Closed
        </button>
      </div>

      <div className=" min-h-[60vh] w-full overflow-y-auto border border-black bg-black text-white p-2 sm:p-4  ">
        {activeTab === "todo" && (
          <div>
            <TodoList />
          </div>
        )}
        {activeTab === "in-progress" && (
          <div>
            <InProgress />
          </div>
        )}
        {activeTab === "completed" && (
          <div>
            <Completed />
          </div>
        )}
      </div>
    </div>
  );
}
