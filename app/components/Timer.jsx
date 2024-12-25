"use client";
import React, { useState, useEffect } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { RiResetLeftFill } from "react-icons/ri";
const Timer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning((prevRunning) => !prevRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        className="text-white font-semibold text-lg"
        style={{ fontFamily: "monospace" }}
      >
        {formatTime(time)}
      </div>
      {/* Play/Pause Button */}
      <button
        onClick={handleStartPause}
        className="px-3 py-2 rounded-full text-sm font-medium bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
        style={{ width: "36px", height: "36px" }}
      >
        {isRunning ? <CiPause1 /> : <CiPlay1 />}
      </button>
      {/* Reset Button with Icon */}
      <button
        onClick={handleReset}
        className="px-3 py-2 rounded-full text-sm font-medium  bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center"
        style={{ width: "36px", height: "36px" }}
      >
        <RiResetLeftFill />
      </button>
    </div>
  );
};

export default Timer;
