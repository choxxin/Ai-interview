import React from "react";

const QuestionPanel = ({ title, id, description, difficulty, stats }) => {
  // Function to parse stats
  const parsedStats = JSON.parse(stats);

  // Function to parse and render description with images
  const renderDescription = (description) => {
    const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif))/i;

    // Split description into parts containing text and image URLs
    const parts = description.split("\n").map((line, index) => {
      const match = line.match(imageRegex);

      if (match) {
        return (
          <div key={index} className="my-4">
            <img
              src={match[1]}
              alt={`Example ${index + 1}`}
              className="rounded-lg shadow-lg mb-4 border border-gray-700"
            />
          </div>
        );
      }

      return (
        <p key={index} className="mb-4 text-gray-300 leading-relaxed">
          {line}
        </p>
      );
    });

    return parts;
  };

  // Map difficulty levels to colors
  const getDifficultyColor = (difficulty) => {
    if (difficulty === "Easy") return "bg-green-500 text-white";
    if (difficulty === "Medium") return "bg-yellow-500 text-white";
    if (difficulty === "Hard") return "bg-red-500 text-white";
    return "bg-gray-400 text-white";
  };

  return (
    <div
      style={{
        padding: "24px",
        backgroundColor: "#2C2C2C",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        height: "100%",
        color: "#F5F5F5",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 border-b-2 border-gray-600 pb-4 mb-6">
        <p className="text-5xl font-semibold text-gray-100">{id}.</p>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>

      {/* Difficulty */}
      <div className="flex mb-6">
        <span
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${getDifficultyColor(
            difficulty
          )}`}
        >
          {difficulty}
        </span>
      </div>

      {/* Stats */}
      <div className="bg-gray-700 p-4 rounded-md mb-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-2">Stats</h2>
        <p className="text-gray-300">
          Total Accepted: {parsedStats.totalAccepted}
        </p>
        <p className="text-gray-300">
          Total Submissions: {parsedStats.totalSubmission}
        </p>
        <p className="text-gray-300">Acceptance Rate: {parsedStats.acRate}</p>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Description
        </h2>
        {renderDescription(description)}
      </div>
    </div>
  );
};

export default QuestionPanel;
