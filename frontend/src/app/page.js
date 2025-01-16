"use client";
import React from "react";
import { redirect } from "next/navigation";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <button
        className=" p-2 rounded-lg hover:text-black hover:bg-white hover:p-4 hover:text-2xl
        transition-all duration-300 ease-in-out"
        onClick={() => redirect("/api/auth/signin?callbackUrl=/home/feed")}
      >
        Clock In
      </button>
      <button
        className=" p-2 rounded-lg hover:text-black hover:bg-white hover:p-4 hover:text-2xl
        transition-all duration-300 ease-in-out"
        onClick={() => redirect("/sign-up")}
      >
        Register
      </button>
    </div>
  );
}
