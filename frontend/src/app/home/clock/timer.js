"use client";
import React, { useState, useRef } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function CountdownTimer() {
  const [time, setTime] = useState(0); // Initial countdown time in seconds (5 minutes)
  const [isRunning, setIsRunning] = useState(false);
  const [resetAble, setResetAble] = useState(true);
  const [countDown, setCountDown] = useState(false);
  const timerRef = useRef(null);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const ret = [
      `${hours.toString().padStart(2, "0")}`,
      `${mins.toString().padStart(2, "0")}`,
      `${secs.toString().padStart(2, "0")}`,
    ];
    return ret;
  };

  const startTimer = () => {
    if (!isRunning && time > 0) {
      setIsRunning(true);
      setResetAble(false);
      setCountDown(true);
      timerRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setCountDown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setResetAble(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCountDown(false);
    clearInterval(timerRef.current);
    setTime(0); // Reset to initial time (5 minutes)
  };

  const incrementSec = () => {
    setTime((prevTime) => prevTime + 1);
  };
  const decrementSec = () => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 1);
    }
  };

  const incrementMin = () => {
    setTime((prevTime) => prevTime + 60);
  };
  const decrementMin = () => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 60);
    }
  };

  const incrementHour = () => {
    setTime((prevTime) => prevTime + 3600);
  };
  const decrementHour = () => {
    if (time > 0) {
      setTime((prevTime) => prevTime - 3600);
    }
  };

  return (
    <div>
      {!countDown && (
        <div className="flex items-center justify-center gap-4">
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {formatTime(time)[0] + "h"}
          </div>
          <div className="flex flex-col gap-4  mb-6">
            <button onClick={() => incrementHour()}>
              <FaArrowUp />
            </button>
            <button onClick={() => decrementHour()}>
              <FaArrowDown />
            </button>
          </div>
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {formatTime(time)[1] + "m"}
          </div>
          <div className="flex flex-col gap-4  mb-6">
            <button onClick={() => incrementMin()}>
              <FaArrowUp />
            </button>
            <button onClick={() => decrementMin()}>
              <FaArrowDown />
            </button>
          </div>
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {formatTime(time)[2] + "s"}
          </div>
          <div className="flex flex-col gap-4  mb-6">
            <button onClick={() => incrementSec()}>
              <FaArrowUp />
            </button>
            <button onClick={() => decrementSec()}>
              <FaArrowDown />
            </button>
          </div>
        </div>
      )}

      {countDown && (
        <div className="flex items-center justify-center gap-4">
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {
              <div>
                {formatTime(time)[0]}
                <span className="blink">:</span>
                {formatTime(time)[1]}
                <span className="blink">:</span>
                {formatTime(time)[2]}
              </div>
            }
          </div>
        </div>
      )}
      <div className="flex items-center justify-center gap-4 mb-6">
        {!isRunning && (
          <button
            onClick={startTimer}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            onClick={pauseTimer}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          >
            Pause
          </button>
        )}
        {resetAble && (
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
