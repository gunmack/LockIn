"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaArrowUp, FaArrowDown, FaPause } from "react-icons/fa";
import { VscDebugStart } from "react-icons/vsc";
import { RiResetRightFill } from "react-icons/ri";

export default function CountdownTimer() {
  const [time, setTime] = useState(() => {
    const savedTime = localStorage.getItem("countdown-time");
    return savedTime && !isNaN(savedTime) && parseInt(savedTime, 10) >= 0
      ? parseInt(savedTime, 10)
      : 0; // Defaults to 0 if savedTime is invalid
  });

  const [isRunning, setIsRunning] = useState(() => {
    const savedState = localStorage.getItem("countdown-isRunning");
    return savedState === "true"; // Defaults to false
  });
  const [resetAble, setResetAble] = useState(false);
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
      const endTime = Date.now() + time * 1000; // Calculate the end time
      localStorage.setItem("countdown-endTime", endTime);
      localStorage.setItem("countdown-isRunning", true);
      setIsRunning(true);
      setResetAble(false);
      setCountDown(true);
      timerRef.current = setInterval(() => {
        const remainingTime = Math.max(
          0,
          Math.floor((endTime - Date.now()) / 1000)
        );
        setTime(remainingTime);
        if (remainingTime <= 0) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          setCountDown(false);
          localStorage.removeItem("countdown-endTime");
          localStorage.setItem("countdown-isRunning", false);
        }
      }, 1000);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setResetAble(true);
    clearInterval(timerRef.current);
    const remainingTime = time;
    localStorage.setItem("countdown-time", remainingTime);
    localStorage.setItem("countdown-isRunning", false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCountDown(false);
    setResetAble(false);
    clearInterval(timerRef.current);
    setTime(0);
    localStorage.removeItem("countdown-time");
    localStorage.removeItem("countdown-isRunning");
    localStorage.removeItem("countdown-endTime");
  };

  const adjustTime = (amount, maxValue) => {
    setTime((prevTime) => {
      if (prevTime === 0 && amount < 0) {
        if (maxValue !== undefined) {
          setResetAble(true);
          // Wrap around to the maximum value
          return maxValue;
        }
      }
      setResetAble(true);
      // Adjust time, ensuring it doesn't go below 0
      return Math.max(0, prevTime + amount);
    });
  };

  useEffect(() => {
    const savedEndTime = localStorage.getItem("countdown-endTime");

    if (isRunning && time > 0 && savedEndTime) {
      const remainingTime = Math.max(
        0,
        Math.floor((savedEndTime - Date.now()) / 1000)
      );

      if (remainingTime > 0) {
        setTime(remainingTime);
        setCountDown(true);
        setResetAble(false);

        timerRef.current = setInterval(() => {
          const newRemainingTime = Math.max(
            0,
            Math.floor((savedEndTime - Date.now()) / 1000)
          );
          setTime(newRemainingTime);
          if (newRemainingTime <= 0) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setCountDown(false);
            localStorage.removeItem("countdown-endTime");
            localStorage.setItem("countdown-isRunning", false);
          }
        }, 1000);
      } else {
        // If the savedEndTime has passed, clear it
        setIsRunning(false);
        setCountDown(false);
        localStorage.removeItem("countdown-endTime");
        localStorage.setItem("countdown-isRunning", false);
        setTime(0);
      }
    } else if (time === 0) {
      setIsRunning(false);
      setCountDown(false);
      localStorage.setItem("countdown-isRunning", false);
      setTime(0);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, time]);

  return (
    <div>
      {!countDown && (
        <div className="flex items-center justify-center gap-4">
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {formatTime(time)[0] + "h"}
          </div>
          <div className="flex flex-col gap-4  mb-6">
            <button onClick={() => adjustTime(3600)}>
              <FaArrowUp />
            </button>
            <button onClick={() => adjustTime(-3600)}>
              <FaArrowDown />
            </button>
          </div>
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {formatTime(time)[1] + "m"}
          </div>
          <div className="flex flex-col gap-4  mb-6">
            <button onClick={() => adjustTime(60, 3540)}>
              <FaArrowUp />
            </button>
            <button onClick={() => adjustTime(-60, 3540)}>
              <FaArrowDown />
            </button>
          </div>
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-8 rounded-lg">
            {formatTime(time)[2] + "s"}
          </div>
          <div className="flex flex-col gap-4  mb-6">
            <button onClick={() => adjustTime(1, 59)}>
              <FaArrowUp />
            </button>
            <button onClick={() => adjustTime(-1, 59)}>
              <FaArrowDown />
            </button>
          </div>
        </div>
      )}

      {countDown && (
        <div className="flex items-center justify-center gap-4">
          <div className="text-6xl font-mono mb-6 bg-gray-200 text-black p-4 ml-4 rounded-lg">
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
            <VscDebugStart className="inline-flex items-center justify-center text-2xl" />{" "}
          </button>
        )}
        {isRunning && (
          <button
            onClick={pauseTimer}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
          >
            <FaPause className="inline-flex items-center justify-center text-2xl" />{" "}
          </button>
        )}
        {resetAble && (
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            <RiResetRightFill className="inline-flex items-center justify-center text-2xl" />
          </button>
        )}
      </div>
    </div>
  );
}
