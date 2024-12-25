"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Split from "react-split";
import QuestionPanel from "@/app/components/QuestionPanel";
import CodeEditor from "@/app/components/CodeEditor";
import Timer from "@/app/components/Timer";
import { FaKey } from "react-icons/fa6";
import CsrfCookieForm from "@/app/components/tokendropdown";

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
            throw new Error(`Error fetching data: ${response.statusText}`);
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
      <div className="navbar" style={{ backgroundColor: "#2C2C2C" }}>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl text-white">daisyUI</a>
          <details className="dropdown mr-5 ">
            <summary className="btn m-1">
              <FaKey />
            </summary>
            <ul className="menu dropdown-content   rounded-box z-[1] min-w-52 p-2 shadow bg-black ">
              <li>
                <CsrfCookieForm />
              </li>
            </ul>
          </details>
        </div>
        <Timer />
        <div className="flex-none">
          {/* User Avatar and Cart */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {" "}
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
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
          backgroundColor: "#3a3a3a",
        }}
        gutter={() => {
          const gutter = document.createElement("div");
          gutter.className = "custom-gutter";
          const symbol = document.createElement("div");
          symbol.className = "gutter-symbol ";
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
