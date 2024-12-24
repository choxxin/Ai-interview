import React from "react";

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
    { label: "Go", value: "go" },
    { label: "C#", value: "csharp" },
    { label: "C", value: "c" },
    { label: "Python3", value: "python3" },
  ];

  return (
    <div
      className="flex justify-between"
      style={{
        padding: "10px",
        backgroundColor: "#262626",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div>
        <label
          htmlFor="language-selector"
          style={{ fontWeight: "bold", marginRight: "10px", color: "white" }}
        >
          Select Language:
        </label>
        <select
          id="language-selector"
          value={selectedLanguage}
          onChange={(e) => onSelectLanguage(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mr-9" style={{ display: "flex", gap: "10px" }}>
        <button
          className="w-24"
          type="button"
          onClick={() => console.log("Language selected:", selectedLanguage)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#4CAF50", // Green for "Run"
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          disabled={selectedLanguage === ""}
        >
          Run
        </button>
        <button
          className="w-24"
          type="button"
          onClick={() => console.log("Language selected:", selectedLanguage)}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#007BFF", // Blue for "Submit"
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007BFF")}
          disabled={selectedLanguage === ""}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
