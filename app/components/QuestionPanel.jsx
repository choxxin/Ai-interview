const QuestionPanel = () => {
  return (
    <div
      style={{
        padding: "16px",
        backgroundColor: "#1E1E1E",
        height: "100%",
      }}
    >
      <div className="flex gap-2 border-red-400 border-2">
        <p className="text-4xl font-semibold text-gray-200"> 14.</p>
        <p className="text-4xl font-semibold text-gray-200">
          Longest Common Prefix
        </p>
      </div>
      <div className="flex">
        <button
          className="  hover:bg-blue-700 text-green-400 font-bold py-2 px-4 rounded"
          style={{ backgroundColor: "#444444" }}
        >
          EASY
        </button>
      </div>
      <div className="flex flex-col">
        <p style={{ color: "#F5F5F5" }}>
          Write a function to find the longest common prefix string amongst an
          array of strings. If there is no common prefix, return an empty string
          "".
        </p>
      </div>
    </div>
  );
};
export default QuestionPanel;
