"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetch("/tasks.json")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((task) => task.status === "to-do");
        setTasks(filtered);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-8 sm:p-8  ">
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
          <div className=" sm:ml-auto items-center sm:items-end sm:my-2 p-2 bg-red-600 rounded-lg">
            <p className="font-bold text-center text-sm md:text-lg ">
              {task.dueDate}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
