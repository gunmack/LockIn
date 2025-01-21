import React, { useState, useEffect, useRef } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { FaPause } from "react-icons/fa";
import { RiResetRightFill } from "react-icons/ri";
export default function Stopwatch() {

  const [resetAble, setresetAble] = useState(false); // Pause state
  const timerRef = useRef(null); // Reference for the interval

  const [time, setTime] = useState(() => {
    // Load saved time from localStorage if available
    const savedTime = localStorage.getItem("stopwatch-time");
    return savedTime ? parseInt(savedTime, 10) : 0;
  });

  const [isRunning, setIsRunning] = useState(() => {
    // Load running state from localStorage
    const savedState = localStorage.getItem("stopwatch-isRunning");
    return savedState === "true";
  });

  // Start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      const startTimestamp = Date.now() - time;
      localStorage.setItem("stopwatch-startTimestamp", startTimestamp);
      setIsRunning(true);
      localStorage.setItem("stopwatch-isRunning", true);
      setresetAble(false);
    }
  };

  // Stop the stopwatch
  const stopStopwatch = () => {
    if (isRunning) {
      const elapsedTime = Date.now() - parseInt(localStorage.getItem("stopwatch-startTimestamp"), 10);
      setTime(elapsedTime);
      localStorage.setItem("stopwatch-time", elapsedTime);
      setIsRunning(false);
      localStorage.setItem("stopwatch-isRunning", false);
      setresetAble(true);
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    setTime(0);
    setIsRunning(false);
    localStorage.removeItem("stopwatch-time");
    localStorage.removeItem("stopwatch-isRunning");
    localStorage.removeItem("stopwatch-startTimestamp");
    setresetAble(false);
  };

  // Format time as mm:ss:msms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    return [
      `${minutes.toString().padStart(2, "0")}`,
      `${seconds.toString().padStart(2, "0")}`,
      `${milliseconds.toString().padStart(2, "0")}`,
    ];
  };

  // Effect to update time while running
  useEffect(() => {
    if (isRunning) {
      const startTimestamp = parseInt(localStorage.getItem("stopwatch-startTimestamp"), 10);
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimestamp);
      }, 10);
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isRunning]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-6xl font-mono bg-gray-200 text-black p-4 rounded-lg">
        {!isRunning && formatTime(time).join(":")}
        {isRunning && (
          <div>
            {formatTime(time)[0]}
            <span className="blink">:</span>
            {formatTime(time)[1]}
            <span className="blink">.</span>
            {formatTime(time)[2]}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-4">
        {!isRunning && (
          <button
            onClick={startStopwatch}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <VscDebugStart className="inline-flex items-center justify-center text-2xl" />{" "}
          </button>
        )}

        {isRunning && (
          <button
            onClick={stopStopwatch}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            <FaPause className="inline-flex items-center justify-center text-2xl" />{" "}
          </button>
        )}

        {resetAble && !isRunning && (
          <button
            onClick={resetStopwatch}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            <RiResetRightFill className="inline-flex items-center justify-center text-2xl" />{" "}
          </button>
        )}
      </div>
    </div>
  );
}
