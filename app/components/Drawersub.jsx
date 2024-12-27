"use client";
import { RiArchiveDrawerFill } from "react-icons/ri";
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
import useSubmissionStore from "../Zustand/submitresponse";
export function DrawerDemosub({ handlesubmit }) {
  const { submit, loadingsubmit } = useSubmissionStore();
  const response = submit;
  const loading = loadingsubmit;
  const isfunctionthere = () => {
    if (typeof handlesubmit === "function") {
      return true;
    } else {
      return false;
    }
  };
  // Function to handle the runtime status and test case results
  const renderTestCaseDetails = () => {
    if (!response.run_success) {
      return (
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
            {response?.full_compile_error || "No compile error information"}
          </pre>
        </div>
      );
    } else {
      const {
        total_testcases,
        total_correct,
        last_testcase,
        expected_output,
        code_output,
      } = response;
      const testCasesPassed = `${total_correct || 0}/${total_testcases || 0}`;
      const allTestCasesPassed = total_correct === total_testcases;

      return (
        <div style={{ marginTop: "20px" }}>
          <h4
            style={{
              color: allTestCasesPassed ? "#28a745" : "#ffc107", // Green if all pass, Yellow otherwise
            }}
          >
            {allTestCasesPassed
              ? "Submission Successful!"
              : "Some Test Cases Failed"}
          </h4>
          <p>
            <strong>Test Cases Passed:</strong> {testCasesPassed}
          </p>
          {!allTestCasesPassed && (
            <div>
              <h5>Last Test Case:</h5>
              <p>
                <strong>Input:</strong> {response.last_testcase || "N/A"}
              </p>
              <p>
                <strong>Expected Output:</strong> {expected_output || "N/A"}
              </p>
              <p>
                <strong>Your Output:</strong> {code_output || "N/A"}
              </p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        {isfunctionthere() ? (
          <button
            onClick={() => {
              handlesubmit();
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        ) : (
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            S<RiArchiveDrawerFill />
          </button>
        )}
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
              color: response?.run_success
                ? response.total_correct === response.total_testcases
                  ? "#28a745" // Green if all test cases passed
                  : "#ffc107" // Yellow if some test cases failed
                : "#dc3545", // Red if compile error
            }}
          >
            {response?.status_msg || "Status Unavailable"}
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
            backgroundColor: "#2d2d2d", // Consistent dark background
          }}
        >
          <h2>Submission Details</h2>

          {loading ? (
            <div className="flex items-center justify-center gap-28">
              <img
                className="items-center h-80 w-[500px]"
                src="/assets/bite.gif" // Path to your downloaded GIF
                alt="No response available"
              />
              <p className="text-3xl font-semibold">Loading ...</p>
            </div>
          ) : response ? (
            <>
              {/* Runtime */}
              <div style={{ color: "#ccc" }}>
                <strong>Runtime:</strong> {response.status_runtime || "N/A"}
              </div>
              {/* Memory Usage */}
              <div style={{ color: "#ccc" }}>
                <strong>Memory:</strong> {response.memory / 1000000} MB
              </div>

              {/* Render test case details */}
              {renderTestCaseDetails()}
            </>
          ) : (
            <div style={{ color: "#ccc" }}>
              <img
                src="/assets/cry.gif" // Path to your downloaded GIF
                alt="No response available"
              />
              <p className="text-lg">No response</p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
