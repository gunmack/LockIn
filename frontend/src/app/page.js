"use client";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Link
        href="#"
        className="hover:text-black hover:bg-white hover:p-2 hover:rounded-lg 
        transition-all duration-300 ease-in-out"
        onClick={() => redirect("/api/auth/signin?callbackUrl=/home")}
      >
        Lock In
      </Link>
    </div>
  );
}
