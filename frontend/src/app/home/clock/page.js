"use client";
import React, { useState } from "react";
import Stopwatch from "@/app/home/clock/stopWatch";
import TimeUpdater from "@/app/home/clock/time";
import Timer from "@/app/home/clock/timer";

export default function Clock() {
  const [mode, setMode] = useState(null);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="flex flex-row space-x-4 py-4">
        <button
          className={`py-2 px-2 rounded-lg hover:text-black hover:bg-white 
            hover:px-4 transition-all duration-300 ease-in-out ${
              mode == "clock" && "bg-green-700"
            }`}
          onClick={() => setMode("clock")}
        >
          Clock
        </button>
        <button
          className={`py-2 px-2 rounded-lg hover:text-black hover:bg-white 
            hover:px-4 transition-all duration-300 ease-in-out ${
              mode == "stopwatch" && "bg-green-700"
            }`}
          onClick={() => setMode("stopwatch")}
        >
          Stopwatch
        </button>
        <button
          className={`py-2 px-2 rounded-lg hover:text-black hover:bg-white 
            hover:px-4 transition-all duration-300 ease-in-out ${
              mode == "timer" && "bg-green-700"
            }`}
          onClick={() => setMode("timer")}
        >
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
