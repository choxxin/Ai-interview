"use client";

import * as React from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerDescription,
  DrawerTitle,
  DrawerContent,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import useResponseStore from "../Zustand/runresponse";

export function DrawerDemo() {
  const { response, loading } = useResponseStore();
  const [selectedCaseIndex, setSelectedCaseIndex] = React.useState(null);

  // Function to render buttons for each case and compare them
  const renderCaseButtons = (expectedAnswers, actualAnswers) => {
    const validExpectedAnswers = expectedAnswers.slice(
      0,
      expectedAnswers.length - 1
    ); // Exclude empty test case
    return validExpectedAnswers.map((expectedAnswer, index) => {
      const isMatch = expectedAnswer === actualAnswers[index];
      return (
        <button
          key={index}
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: isMatch ? "#28a745" : "#dc3545", // Dark green for match, Dark red for mismatch
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: selectedCaseIndex === index ? "bold" : "normal", // Highlight selected button
          }}
          onClick={() => setSelectedCaseIndex(index)} // Set selected case
        >
          Case {index + 1} {isMatch ? "(Match)" : "(Mismatch)"}
        </button>
      );
    });
  };

  // Function to get the expected and actual answers for the selected case
  const getExpectedAndActualCode = (index) => {
    const expected = response?.expected_code_answer?.[index] || "";
    const actual = response?.code_answer?.[index] || "";
    return { expected, actual };
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Open Drawer
        </button>
      </DrawerTrigger>
      <DrawerContent
        style={{
          backgroundColor: "#1a1a1a", // Dark background for drawer
          color: "#fff", // White text color for dark mode
        }}
      >
        <DrawerHeader
          style={{
            backgroundColor: "#333", // Darker background for header
            color: "#fff", // White text for the header
          }}
        >
          <DrawerTitle
            style={{
              color: response?.correct_answer === true ? "#28a745" : "#dc3545", // Dark green for Accepted, Dark red for Wrong
            }}
          >
            {response?.correct_answer === true ? "Accepted" : "Wrong Answer"}
          </DrawerTitle>
          <DrawerDescription style={{ color: "#ccc" }}>
            View detailed submission results
          </DrawerDescription>
        </DrawerHeader>
        <div
          className="h-96 overflow-y-auto"
          style={{
            padding: "20px",
            border: "1px solid #444", // Dark border
            borderRadius: "5px",
            backgroundColor:
              response?.correct_answer === true ? "#2d2d2d" : "#3e3e3e", // Dark background for success or failure
          }}
        >
          <h2>Submission Details</h2>

          {loading ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : response ? (
            <>
              {/* Status */}
              <div style={{ color: "#ccc" }}>
                <strong>Status:</strong> {response.state} ({response.status_msg}
                )
              </div>
              {/* Language */}
              <div style={{ color: "#ccc" }}>
                <strong>Language:</strong> {response.pretty_lang}
              </div>
              {/* Runtime */}
              <div style={{ color: "#ccc" }}>
                <strong>Runtime:</strong> {response.status_runtime}
              </div>
              {/* Memory Usage */}
              <div style={{ color: "#ccc" }}>
                <strong>Memory:</strong> {response.memory / 1000000} MB
              </div>

              {/* Expected Code Answer and Actual Code Answer Comparison */}
              <div style={{ marginTop: "20px" }}>
                <h3>Code Answer Comparison</h3>
                <div style={{ marginBottom: "20px" }}>
                  <h4>Expected Code Answer</h4>
                  {/* Check if expected_code_answer is available */}
                  {response.expected_code_answer &&
                  response.expected_code_answer.length > 0 ? (
                    <ul>
                      {response.expected_code_answer.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <div style={{ color: "#ccc" }}>
                      No expected answers available (All test cases failed?)
                    </div>
                  )}
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <h4>Actual Code Answer</h4>
                  <ul>
                    {response.code_answer.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Display Case Buttons */}
                <div style={{ marginBottom: "20px" }}>
                  {response.expected_code_answer &&
                  response.expected_code_answer.length > 0
                    ? renderCaseButtons(
                        response.expected_code_answer,
                        response.code_answer
                      )
                    : null}
                </div>
                {/* Display the code for the selected test case */}
                {selectedCaseIndex !== null && (
                  <div style={{ marginTop: "20px" }}>
                    <h4>Case {selectedCaseIndex + 1} Details</h4>
                    <div>
                      <strong>Expected Code:</strong>
                      <pre
                        style={{
                          backgroundColor: "#333", // Dark background for code blocks
                          padding: "10px",
                          borderRadius: "5px",
                          color: "#fff", // White text
                        }}
                      >
                        {getExpectedAndActualCode(selectedCaseIndex).expected ||
                          "No expected answer"}
                      </pre>
                    </div>
                    <div>
                      <strong>Your Code:</strong>
                      <pre
                        style={{
                          backgroundColor: "#333", // Dark background for code blocks
                          padding: "10px",
                          borderRadius: "5px",
                          color: "#fff", // White text
                        }}
                      >
                        {getExpectedAndActualCode(selectedCaseIndex).actual ||
                          "No actual answer"}
                      </pre>
                    </div>
                  </div>
                )}
              </div>

              {/* Compiler Error */}
              {response?.full_compile_error && (
                <div
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#dc3545", // Dark red background for errors
                    padding: "10px",
                    borderRadius: "5px",
                    color: "#fff", // White text
                    border: "1px solid #f5c6cb",
                  }}
                >
                  <h4>Compiler Error:</h4>
                  <pre style={{ whiteSpace: "pre-wrap", color: "#fff" }}>
                    {response?.full_compile_error}
                  </pre>
                </div>
              )}
            </>
          ) : (
            <div style={{ color: "#ccc" }}>No response available.</div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
