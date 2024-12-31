import { DrawerDemo } from "@/app/components/Drawer";
import React, { useState, useEffect } from "react";
import useResponseStore from "../Zustand/runresponse";
import useSubmissionStore from "../Zustand/submitresponse";
import { useToast } from "@/hooks/use-toast";

import { DrawerDemosub } from "./Drawersub";
import useResultStore from "../Zustand/resultresponse";
const LanguageSelector = ({
  selectedLanguage,
  onSelectLanguage,
  slug,
  exampleTestcaseList,
  value,
  id,
}) => {
  const { toast } = useToast();

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
  const { loading, setResponse, setLoading } = useResponseStore();
  const [xcsrftoken, setXcsrftoken] = useState("");
  const [cookie, setCookie] = useState("");
  const { setLoadingsubmit, setSubmit } = useSubmissionStore();
  const { Result, addId, removeId, clearResults, hasId } = useResultStore();
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
    "Content-Type": "application/json",
    Accept: "*/*",
  };
  const handlesubmit = async () => {
    setLoadingsubmit(true);
    try {
      const body = {
        slug,
        lang: selectedLanguage,
        question_id: id,
        typed_code: value,
        xcsrftoken,

        cookie,
      };

      const response = await fetch("http://localhost:3000/api/leetcodesubmit", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const result = await response.json();
      if (result?.submission_id) {
        await pollSubmissionStatussubmit(result.submission_id);
      } else {
        toast({
          title: "Seems like you are not authenticated",
          description:
            "Please update your X-CSRF-Token and cookies, then refresh the page.",
        });
      }
      console.log("Submit result:", result);
    } catch (error) {
      toast({
        title: { error: error.message },
        description: "Error while submitting the code",
      });
      console.error("Failed to submit the code:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRun = async () => {
    setLoading(true);
    try {
      const body = {
        slug,
        lang: selectedLanguage,
        question_id: id,
        typed_code: value,
        data_input: exampleTestcaseList.join("\n"),
        xcsrftoken,
        cookie,
      };

      const response = await fetch("http://localhost:3000/api/leetcoderun", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log("Run result:", result);

      if (result?.interpret_id) {
        await pollSubmissionStatusrun(result.interpret_id);
      } else {
        toast({
          title: "Seems like you are not authenticated",
          description:
            "Please update your X-CSRF-Token and cookies, then refresh the page.",
        });
      }
    } catch (error) {
      toast({
        title: { error: error.message },
        description: "Error while running the code",
      });
    }
  };

  const pollSubmissionStatusrun = async (interpret_id) => {
    let requestCount = 0;
    const maxRequests = 20;

    const checkStatus = async () => {
      if (requestCount >= maxRequests) {
        console.log("Stopped polling after 20 requests.");

        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/runcheck", {
          method: "POST",
          headers,
          body: JSON.stringify({ interpret_id, slug }),
        });

        const statusData = await response.json();
        console.log("Submission status:", statusData);

        if (statusData.state === "SUCCESS") {
          console.log("Submission succeeded:", statusData);
          setResponse(statusData);
          setLoading(false);
        } else if (statusData.state === "PENDING") {
          requestCount++;
          setTimeout(checkStatus, 2000);
        } else {
          console.log("Unexpected state:", statusData.state);
          setTimeout(checkStatus, 2000);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.error("Failed to fetch status:", error);
        setTimeout(checkStatus, 2000);
      }
    };

    checkStatus();
  };
  const pollSubmissionStatussubmit = async (submission_id) => {
    let requestCount = 0;
    const maxRequests = 20;

    const checkStatus = async () => {
      if (requestCount >= maxRequests) {
        console.log("Stopped polling after 20 requests.");

        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/submitcheck", {
          method: "POST",
          headers,
          body: JSON.stringify({ submission_id, slug, xcsrftoken, cookie }),
        });

        const statusData = await response.json();
        console.log("Submission status:", statusData);

        if (statusData.state === "SUCCESS") {
          console.log("Submission succeeded:", statusData);
          setSubmit(statusData);

          if (statusData.status_msg === "Accepted") {
            if (!hasId(id)) addId(id);
            console.log("Result1", Result);
          }
          console.log("Result2", Result);
          setLoadingsubmit(false);
        } else if (statusData.state === "PENDING") {
          requestCount++;
          setTimeout(checkStatus, 2000);
        } else {
          console.log("Unexpected state:", statusData.state);
          setTimeout(checkStatus, 2000);
          setLoadingsubmit(false);
        }
      } catch (error) {
        setLoadingsubmit(false);
        console.error("Failed to fetch status:", error);
        setTimeout(checkStatus, 2000);
      }
    };

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
        <DrawerDemo handleRun={handleRun} />
        <DrawerDemosub handlesubmit={handlesubmit} />
        {/* <button
          className="w-24"
          type="button"
          onClick={handleRun}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: loading ? "#ccc" : "#4CAF50", // Gray if loading
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.3s",
          }}
          disabled={loading || !selectedLanguage}
        >
          Run
        </button> */}
        {/* <button
          className="w-24"
          type="button"
          onClick={() => handlesubmit()}
          style={{
            padding: "8px 16px",
            borderRadius: "4px",
            backgroundColor: "#007BFF", // Blue for "Submit"
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          disabled={!selectedLanguage}
        >
          Submit
        </button> */}
      </div>
    </div>
  );
};

export default LanguageSelector;
