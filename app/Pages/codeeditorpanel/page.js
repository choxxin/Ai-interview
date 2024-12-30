"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Split from "react-split";
import QuestionPanel from "@/app/components/QuestionPanel";
import CodeEditor from "@/app/components/CodeEditor";
import Timer from "@/app/components/Timer";
import { FaKey } from "react-icons/fa6";
import CsrfCookieForm from "@/app/components/CsrfCookieForm";
import { DrawerDemo } from "@/app/components/Drawer";
import { DrawerDemosub } from "@/app/components/Drawersub";

const CodeEditorWithQuestion = () => {
  const searchParams = useSearchParams();
  const [questionData, setQuestionData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const link = searchParams.get("link");

  useEffect(() => {
    if (link) {
      const fetchQuestionData = async () => {
        setIsLoading(true);
        try {
          const response = await fetch("http://localhost:3000/api/scrap ", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: link }),
          });
          if (!response.ok)
            return (
              <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
                <h2 className="text-2xl font-semibold">
                  Failed to load question data.
                </h2>
                <p className="mt-4 text-sm text-gray-500">
                  Sometimes this can happen , refresh the page or try again
                  after some time
                </p>
              </div>
            );
          const data = await response.json();
          setQuestionData(data);
        } catch (error) {
          console.error("Failed to fetch question data:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchQuestionData();
    }
  }, [link]);
  if (!link) return <div>Please provide a valid link in the URL.</div>;

  if (isLoading) {
    return (
      <div className="flex flex-col  gap-6 items-center justify-center h-screen bg-gray-900 text-gray-200">
        {/* Loading GIF */}
        <img
          src="/assets/loading.gif" // Path to your downloaded GIF
          alt="Loading"
          className="w-55 h-55" // You can adjust the size here
        />
        <h1 className="text-2xl font-semibold">Loading .....</h1>
      </div>
    );
  }

  if (!questionData)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-semibold">
          Failed to load question data.
        </h2>
      </div>
    );

  return (
    <div>
      <div
        className="navbar"
        style={{
          backgroundColor: "#2C2C2C",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="flex items-center space-x-4">
          <a className="text-xl font-semibold text-white">daisyUI</a>
          <details className="dropdown">
            <summary
              className="btn btn-ghost"
              style={{
                padding: "8px 12px",
                backgroundColor: "transparent",
                color: "white",
                borderRadius: "4px",
              }}
              aria-label="Dropdown Menu"
            >
              <FaKey />
            </summary>
            <ul
              className="menu dropdown-content bg-black rounded-box z-[1] min-w-52 p-2 shadow"
              style={{ color: "white" }}
            >
              <li>
                <CsrfCookieForm />
              </li>
            </ul>
          </details>
        </div>

        <div className="flex items-center space-x-4">
          <DrawerDemo />
          <DrawerDemosub />
          <Timer />

          {/* Avatar and Dropdown */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              aria-label="User Menu"
            >
              <div className="w-10 rounded-full overflow-hidden border border-gray-500">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              style={{ backgroundColor: "#FFFFFF" }}
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge bg-blue-500 text-white">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Split
        sizes={[55, 45]}
        minSize={200}
        gutterSize={14}
        gutterAlign="center"
        style={{
          height: "100vh",
          display: "flex",
          backgroundColor: "#3A3A3A",
        }}
        gutter={() => {
          const gutter = document.createElement("div");
          gutter.className = "custom-gutter";
          const symbol = document.createElement("div");
          symbol.className = "gutter-symbol";
          symbol.innerHTML = "&#9679;";
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

        <CodeEditor
          codeSnippets={questionData.codeSnippets}
          slug={questionData.slug}
          exampleTestcaseList={questionData.exampleTestcaseList}
          id={questionData.id}
        />
      </Split>
    </div>
  );
};

export default CodeEditorWithQuestion;
