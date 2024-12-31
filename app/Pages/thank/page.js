"use client";
import React from "react";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Header */}
      <header className="text-4xl font-bold mb-4 text-center">
        Thank You for Your Submission!
      </header>

      {/* Subtext */}
      <p className="text-gray-400 text-lg mb-6 text-center">
        Your effort matters. Keep up the great work and continue coding!
      </p>

      {/* Icon or Graphic */}
      <div className="mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-blue-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* Button */}
      <div className="flex space-x-4">
        <button
          onClick={() => (window.location.href = "/Pages/landing")}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-md transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => (window.location.href = "/Pages/testselector")}
          className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded shadow-md transition"
        >
          Solve More Problems
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
