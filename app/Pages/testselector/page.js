"use client";

import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation";

const difficultyOptions = ["easy", "medium", "hard"];

export default function Selector() {
  const router = useRouter();
  const [customSelections, setCustomSelections] = useState([
    "easy",
    "easy",
    "medium",
  ]);
  const [isRandom, setIsRandom] = useState(true);

  const handleCustomChange = (index, value) => {
    const updatedSelections = [...customSelections];
    updatedSelections[index] = value;
    setCustomSelections(updatedSelections);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center py-8">
      <h1 className="text-4xl font-extrabold mb-8">Select Your Test Mode</h1>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div
          className={`p-6 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all ${
            isRandom ? "border-2 border-yellow-400" : ""
          }`}
          onClick={() => setIsRandom(true)}
        >
          <img
            src="https://preview.redd.it/4088rvc9bke91.png?width=4735&format=png&auto=webp&s=234ed437bf8b9f10f43c2e9d71436bb8445b31dc"
            alt="Random Mode"
            className="w-72 h-60 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">Random Mode</h2>
          <p className="text-center mt-2 text-gray-400">
            Get random questions of mixed difficulties.
          </p>
        </div>

        <div
          className={`p-6 bg-gray-800 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-all ${
            !isRandom ? "border-2 border-yellow-400" : ""
          }`}
          onClick={() => setIsRandom(false)}
        >
          <img
            src="https://st2.depositphotos.com/1025323/44072/i/450/depositphotos_440724550-stock-photo-personality-study-series-face-young.jpg"
            alt="Custom Mode"
            className="w-72 h-60 mx-auto mb-4"
          />
          <h2 className="text-xl font-semibold text-center">Custom Mode</h2>
          <p className="text-center mt-2 text-gray-400">
            Choose specific difficulties for each question.
          </p>
        </div>
      </div>

      {!isRandom && (
        <div className="w-full md:w-2/3 lg:w-1/2 bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">
            Select Question Difficulties
          </h2>
          <div className="flex gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <label
                  htmlFor={`q${index}`}
                  className="text-lg font-medium text-gray-300"
                >
                  Question {index + 1}
                </label>
                <select
                  id={`q${index}`}
                  value={customSelections[index]}
                  onChange={(e) => handleCustomChange(index, e.target.value)}
                  className="p-2 border rounded bg-gray-700 text-gray-200"
                >
                  {difficultyOptions.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={{
          pathname: isRandom ? "/Pages/test" : "/Pages/selectedtest", // Conditional path based on mode
          query: !isRandom
            ? { selections: JSON.stringify(customSelections) }
            : {}, // Pass custom selections if it's not random
        }}
        passHref
      >
        <button className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-md">
          Start Test
        </button>
      </Link>
    </div>
  );
}
