"use client";
import React, { useState } from "react";
import Stopwatch from "@/app/home/clock/stopWatch";
import TimeUpdater from "@/app/home/clock/time";
import Timer from "@/app/home/clock/timer";
import { LuClock } from "react-icons/lu";
import { FaStopwatch } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";

export default function Clock() {
  const [mode, setMode] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-row space-x-4 py-4">
        <button
          className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
            mode === "clock"
              ? "bg-green-700 text-white cursor-not-allowed"
              : "hover:text-black hover:bg-white hover:px-4"
          }`}
          onClick={() => setMode("clock")}
        >
          <LuClock className="inline-flex items-center justify-center mb-0.5" />{" "}
          Clock
        </button>
        <button
          className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
            mode == "stopwatch"
              ? "bg-green-700  text-white cursor-not-allowed"
              : "hover:text-black hover:bg-white hover:px-4"
          }`}
          onClick={() => setMode("stopwatch")}
        >
          <FaStopwatch className="inline-flex items-center justify-center mb-0.5" />{" "}
          Stopwatch
        </button>
        <button
          className={`py-2 px-2 rounded-lg transition-all duration-300 ease-in-out ${
            mode == "timer"
              ? "bg-green-700  text-white cursor-not-allowed"
              : "hover:text-black hover:bg-white hover:px-4"
          }`}
          onClick={() => setMode("timer")}
        >
          <IoIosTimer className="inline-flex items-center justify-center mb-0.5" />{" "}
          Timer
        </button>
      </div>
      <div>
        {mode == "clock" && <TimeUpdater />}
        {mode == "stopwatch" && <Stopwatch />}
        {mode == "timer" && <Timer />}
      </div>
    </div>
  );
}
