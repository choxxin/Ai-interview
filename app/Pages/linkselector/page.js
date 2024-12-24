"use client";
import React, { useState } from "react";
import Link from "next/link";

const LeetCodePage = () => {
  const [questionLink, setQuestionLink] = useState(
    "https://leetcode.com/problems/4sum/description/"
  );

  const handleInputChange = (e) => {
    setQuestionLink(e.target.value);
  };

  // const handleSubmit = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/scrap", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ url: questionLink }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json(); // Get the response data
  //       // Pass the data to the next page
  //       router.push({
  //         pathname: "/codeeditorpanel",
  //         query: { data: JSON.stringify(data) }, // Ensure 'data' is correct
  //       });
  //     } else {
  //       console.error("Failed to process the LeetCode question.");
  //     }
  //   } catch (error) {
  //     console.error("Error processing LeetCode question:", error);
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-gray-200">
      {/* LeetCode Logo */}
      <img
        src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
        alt="LeetCode Logo"
        className="w-36 mb-6"
      />

      {/* Label */}
      <h1 className="text-2xl font-bold mb-6">Solve Any LeetCode Question</h1>

      {/* Text Area for Input */}
      <div className="flex flex-col items-center w-full max-w-md">
        <textarea
          value={questionLink}
          onChange={handleInputChange}
          placeholder="Paste LeetCode question link here..."
          className="w-full p-4 bg-gray-800 text-gray-200 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          rows={4}
        />

        {/* Submit Button */}
        <button className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition">
          <Link
            href={{
              pathname: "/Pages/codeeditorpanel",
              query: { link: questionLink },
            }}
          >
            Submit
          </Link>
        </button>
      </div>
    </div>
  );
};

export default LeetCodePage;
