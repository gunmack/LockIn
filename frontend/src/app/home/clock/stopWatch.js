import React, { useState, useRef } from "react";
export default function Stopwatch() {
  const [time, setTime] = useState(0); // Time in milliseconds
  const [isRunning, setIsRunning] = useState(false); // Stopwatch state
  const [resetAble, setresetAble] = useState(false); // Pause state
  const timerRef = useRef(null); // Reference for the interval

  // Start the stopwatch
  const startStopwatch = () => {
    if (!isRunning) {
      setIsRunning(true);
      setresetAble(false);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Increment time by 10ms
      }, 10);
    }
  };

  // Stop the stopwatch
  const stopStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
      setresetAble(true);
      clearInterval(timerRef.current);
    }
  };

  // Reset the stopwatch
  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setresetAble(false);
    setTime(0);
  };

  // Format time as mm:ss:msms
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    const ret = [
      `${minutes.toString().padStart(2, "0")}`,
      `${seconds.toString().padStart(2, "0")}`,
      `${milliseconds.toString().padStart(2, "0")}`,
    ];
    return ret;
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-6xl font-mono bg-gray-200 text-black p-4 rounded-lg">
        {!isRunning && formatTime(time).join(":")}
        {isRunning && (
          <div>
            {formatTime(time)[0]}
            <span className="blink">:</span>
            {formatTime(time)[1]}
            <span className="blink">:</span>
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
            Start
          </button>
        )}

        {isRunning && (
          <button
            onClick={stopStopwatch}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Stop
          </button>
        )}

        {resetAble && !isRunning && (
          <button
            onClick={resetStopwatch}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
