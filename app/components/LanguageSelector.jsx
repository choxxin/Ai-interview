import React from "react";

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  const languages = [
    { label: "JavaScript", value: "javascript" },
    { label: "Python", value: "python" },
    { label: "Java", value: "java" },
    { label: "C++", value: "cpp" },
    { label: "Go", value: "go" },
    { label: "C#", value: "csharp" },
  ];

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: "#262626",
        borderBottom: "1px solid #ddd",
      }}
    >
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
  );
};

export default LanguageSelector;
