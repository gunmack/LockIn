"use client";
import React from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <div className="flex flex-row w-3/4 mx-auto">
      <div className=" bg-white text-black py-2 px-4 rounded-lg flex justify-between items-center fixed m-2 w-3/4 mx-auto ">
        <div className="flex  gap-4 left-2  ">
          <Link
            href="/home/feed"
            className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
              path === "/home/feed"
                ? "bg-black text-white px-4"
                : "hover:text-white hover:bg-black hover:px-4"
            }`}
          >
            Feed
          </Link>
          <Link
            href="/home/clock"
            className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
              path === "/home/clock"
                ? "bg-black text-white px-4"
                : "hover:text-white hover:bg-black hover:px-4"
            }`}
          >
            Clock
          </Link>
          <Link
            href="#"
            className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
              path === "/home/calendar"
                ? "bg-black text-white px-4"
                : "hover:text-white hover:bg-black hover:px-4"
            }`}
          >
            Calendar
          </Link>
          <Link
            href="/home/tasks"
            className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
              path === "/home/tasks"
                ? "bg-black text-white px-4"
                : "hover:text-white hover:bg-black hover:px-4"
            }`}
          >
            Tasks
          </Link>
        </div>

        <div className="flex gap-4 ">
          <Link
            href="/home/profile"
            className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
              path === "/home/profile"
                ? "bg-black text-white px-4"
                : "hover:text-white hover:bg-black hover:px-4"
            }`}
          >
            Account
          </Link>
          <Link
            href="#"
            className="py-2 px-2 rounded-lg text-red-700 font-bold hover:text-white hover:bg-red-700 hover:px-4 
        transition-all duration-300 ease-in-out"
            onClick={() => redirect("/api/auth/signout?callbackUrl=/")}
          >
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
