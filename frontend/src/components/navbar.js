"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { FaStar, FaTasks, FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { MdLogout } from "react-icons/md";

export default function Navbar() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const path = usePathname();

  useEffect(() => {
    // Function to handle scroll event
    const handleScrollnMouse = (e) => {
      if (window.scrollY > 50 || e.clientY <= 50) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(false);
      }
    };
    window.addEventListener("scroll", handleScrollnMouse);
    window.addEventListener("mousemove", handleScrollnMouse);
    return () => {
      window.removeEventListener("scroll", handleScrollnMouse);
      window.removeEventListener("mousemove", handleScrollnMouse);
    };
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-full  py-2 px-4 rounded-lg 
        flex justify-center items-center transform transition-all duration-500 ease-in-out ${
          isNavbarVisible
            ? "translate-y-10 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
    >
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
            <FaStar className="inline-flex items-center justify-center mb-1" />{" "}
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
            <FaRegClock className="inline-flex items-center justify-center mb-1" />{" "}
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
            <FaCalendarAlt className="inline-flex items-center justify-center mb-1" />{" "}
            Calendar
          </Link>
          <Link
            href="/home/tasks"
            className={` py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
              path === "/home/tasks"
                ? "bg-black text-white px-4"
                : "hover:text-white hover:bg-black hover:px-4"
            }`}
          >
            <FaTasks className="inline-flex items-center justify-center mb-1" />{" "}
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
            <VscAccount className="inline-flex items-center justify-center mb-1" />{" "}
            Account
          </Link>
          <Link
            href="#"
            className="py-2 px-2 rounded-lg text-red-700 font-bold hover:text-white hover:bg-red-700 hover:px-4 
        transition-all duration-300 ease-in-out"
            onClick={() => redirect("/api/auth/signout?callbackUrl=/")}
          >
            <MdLogout className="inline-flex items-center justify-center mb-1" />{" "}
            Sign Out
          </Link>
        </div>
      </div>
    </div>
  );
}
