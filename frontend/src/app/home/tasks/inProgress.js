"use client";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import fetchTasks from "@/app/home/tasks/fetch";

export default function InProgress({ refreshSignal }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function loadTasks() {
      const filtered = await fetchTasks("in-progress");
      setTasks(filtered);
    }
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:p-8">
      {tasks.map((task) => (
        <Link
          key={task.id}
          href={`/home/tasks/${task.id}`}
          className="border flex flex-col sm:flex-row p-4 rounded-lg bg-zinc-800"
        >
          <div className=" sm:mr-auto items-center sm:items-start sm:my-2 p-2">
            <h3 className="font-semibold text-center text-sm md:text-lg">
              {task.title}
            </h3>
            {/* <p className="text-sm text-gray-300">{task.description}</p> */}
          </div>
          <div className=" sm:ml-auto items-center sm:items-end sm:my-2 p-2 bg-blue-600 rounded-lg">
            <p className="font-bold text-center text-sm md:text-lg ">
              {task.dueDate}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
