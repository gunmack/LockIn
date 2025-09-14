"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import fetchTasks from "@/app/home/tasks/fetch";

export default function Completed({ refreshSignal }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function loadTasks() {
      const filtered = await fetchTasks("complete");
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
          </div>
          <div className=" sm:ml-auto items-center sm:items-end sm:my-2 p-2 bg-green-600 rounded-lg">
            <p className="font-bold text-center text-sm md:text-lg ">
              {task.dueDate}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
