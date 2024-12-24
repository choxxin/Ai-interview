"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Split from "react-split";
import QuestionPanel from "@/app/components/QuestionPanel";
import CodeEditor from "@/app/components/CodeEditor"; // Ensure CodeEditor component is imported

const CodeEditorWithQuestion = () => {
  const searchParams = useSearchParams();
  const [questionData, setQuestionData] = useState(null); // Holds fetched question data
  const [isLoading, setIsLoading] = useState(true); // Tracks loading state
  const link = searchParams.get("link");

  useEffect(() => {
    if (link) {
      // Fetch the question data from the API
      const fetchQuestionData = async () => {
        setIsLoading(true); // Start loading
        try {
          const response = await fetch("http://localhost:3000/api/scrap", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: link }), // Send the link as the body of the request
          });
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          const data = await response.json();
          setQuestionData(data); // Update the state with fetched data
        } catch (error) {
          console.error("Failed to fetch question data:", error);
        } finally {
          setIsLoading(false); // End loading
        }
      };

      fetchQuestionData();
    }
  }, [link]); // Trigger this effect whenever the `link` changes

  if (!link) {
    return <div>Please provide a valid link in the URL.</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-semibold">Loading question data...</h2>
      </div>
    );
  }

  if (!questionData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-semibold">
          Failed to load question data.
        </h2>
      </div>
    );
  }

  return (
    <Split
      sizes={[55, 45]}
      minSize={200}
      gutterSize={14} // Width of the splitter bar
      gutterAlign="center"
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#3a3a3a",
      }}
      gutter={() => {
        // Create a custom gutter element with a symbol
        const gutter = document.createElement("div");
        gutter.className = "custom-gutter";
        const symbol = document.createElement("div");
        symbol.className = "gutter-symbol ";
        symbol.innerHTML = "&#9679;"; // Unicode for a filled circle
        gutter.appendChild(symbol);
        return gutter;
      }}
    >
      <QuestionPanel
        title={questionData.title}
        id={questionData.id}
        description={questionData.description}
        difficulty={questionData.difficulty}
        stats={questionData.stats}
      />

      <CodeEditor codeSnippets={questionData.codeSnippets} />
    </Split>
  );
};

export default CodeEditorWithQuestion;
