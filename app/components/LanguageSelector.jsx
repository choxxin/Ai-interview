import React, { useState, useEffect } from "react";

const LanguageSelector = ({
  selectedLanguage,
  onSelectLanguage,
  slug,
  exampleTestcaseList,
  value,
  id,
}) => {
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

  const [xcsrftoken, setXcsrftoken] = useState("");
  const [cookie, setCookie] = useState("");

  useEffect(() => {
    const storedXcsrftoken = localStorage.getItem("X-CSRF-Token");
    const storedCookie = localStorage.getItem("Cookie");
    setXcsrftoken(storedXcsrftoken || "");
    setCookie(storedCookie || "");
  }, []);

  const headers = {
    Referer: `https://leetcode.com/problems/${slug}/description/`,
    "Sec-CH-UA-Mobile": "?1",
    "X-CSRFToken": xcsrftoken,
    Cookie: cookie,
  };
  const handleRun = async () => {
    const body = {
      slug: slug,
      lang: selectedLanguage,
      question_id: id,
      typed_code: value,
      data_input: exampleTestcaseList.join("\n"),
      xcsrftoken: xcsrftoken,
      cookie: cookie,
    };

    try {
      // Make the first fetch request
      const response = await fetch("http://localhost:3000/api/leetcoderun", {
        method: "POST",
        headers: {
          Accept: "*/*", // The value should be "*/*" or another valid value for Accept
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Accept-Language": "en-GB,en;q=0.8",
          "Content-Type": "application/json",
          Referer: "https://leetcode.com/problems/longest-common-prefix/",
          Origin: "https://leetcode.com", // Uncomment if needed
          "Sec-CH-UA":
            '"Brave";v="131", "Chromium";v="131", "Not_A Brand";v="24"', // Uncomment if needed
          "Sec-CH-UA-Mobile": "?1", // Uncomment if needed
          "Sec-CH-UA-Platform": '"Android"', // Uncomment if needed
          "Sec-Fetch-Dest": "empty", // Uncomment if needed
          "Sec-Fetch-Mode": "same-origin", // Uncomment if needed
          "Sec-GPC": "1", // Uncomment if needed
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36", // Uncomment if needed
          "X-CSRFToken": xcsrftoken, // Uncomment if
          Cookie: cookie,
        },
        body: JSON.stringify(body),
      });

      // Parse the result to get the interpret_id
      const result = await response.json();
      console.log("Run result:", result);

      const interpret_id = result.interpret_id;

      // Poll the submission status
      await pollSubmissionStatus(interpret_id);
    } catch (error) {
      console.error("Failed to run the code:", error);
    }
  };

  const pollSubmissionStatus = async (interpret_id) => {
    const statusUrl = `http://localhost:3000/api/runcheck`;
    let requestCount = 0; // Counter for the number of requests made

    const checkStatus = async () => {
      try {
        // Stop polling after 20 requests
        if (requestCount >= 20) {
          console.log("Stopped polling after 20 requests.");
          return;
        }

        const response = await fetch(statusUrl, {
          method: "POST", // Use GET method as it's a status check
          headers: {
            "X-CSRFToken": xcsrftoken, // Include CSRF token
            Cookie: cookie, // Include cookies if necessary
          },
          body: JSON.stringify({
            "x-csrftoken": xcsrftoken, // Include CSRF token
            cookie: cookie, // Include cookies if necessary
            slug: slug, // Include
            interpret_id: interpret_id, // Include the interpret
          }),
        });

        const statusData = await response.json();
        console.log("Submission status:", statusData);

        // Increment the request count
        requestCount++;

        // Check if the state is success
        if (statusData.state === "SUCCESS") {
          console.log("Submission succeeded:", statusData);
        } else if (statusData.state === "PENDING") {
          // If the state is still pending, poll again after 2 seconds
          console.log("Still pending, retrying...");
          setTimeout(checkStatus, 2000); // Poll again after 2 seconds
        } else {
          // Handle other states or errors
          console.error("Unexpected state:", statusData.state);
          setTimeout(checkStatus, 2000); // Retry after 2 seconds
        }
      } catch (error) {
        console.error("Failed to fetch status:", error);
        setTimeout(checkStatus, 2000); // Retry after 2 seconds
      }
    };

    // Start checking the status
    checkStatus();
  };

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
          onClick={handleRun}
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
          disabled={!selectedLanguage}
        >
          Run
        </button>
        <button
          className="w-24"
          type="button"
          onClick={() => console.log("Submit clicked")}
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
          disabled={!selectedLanguage}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
