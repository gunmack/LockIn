"use client";
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Navbar() {
  return (
    <div>
      <div className=" bg-white text-black p-2 w-full flex justify-end fixed gap-10 px-4">
        <Link
          href="/"
          className="py-2 hover:text-white hover:bg-black hover:px-2 hover:rounded-lg 
        transition-all duration-300 ease-in-out"
        >
          LockIn
        </Link>
        <Link
          href="#"
          className="py-2 hover:text-white hover:bg-black hover:px-2 hover:rounded-lg 
        transition-all duration-300 ease-in-out"
        >
          Profile
        </Link>
        <Link
          href="#"
          className="py-2 hover:text-white hover:bg-black hover:px-2 hover:rounded-lg 
        transition-all duration-300 ease-in-out"
          onClick={() => redirect("/api/auth/signout?callbackUrl=/")}
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
}
