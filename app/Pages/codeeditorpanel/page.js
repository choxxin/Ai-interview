"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Split from "react-split";
import QuestionPanel from "@/app/components/QuestionPanel";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import CodeEditor from "@/app/components/CodeEditor";
import Timer from "@/app/components/Timer";
import { FaKey } from "react-icons/fa6";
import CsrfCookieForm from "@/app/components/CsrfCookieForm";
import { DrawerDemo } from "@/app/components/Drawer";
import { DrawerDemosub } from "@/app/components/Drawersub";
import { AlertDialogDemo } from "@/app/components/Alertdial";

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
          const response = await fetch("http://localhost:3000/api/scrap", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: link }),
          });
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
      <div className="flex flex-col gap-6 items-center justify-center h-screen bg-gray-900 text-gray-200">
        <img src="/assets/loading.gif" alt="Loading" className="w-55 h-55" />
        <h1 className="text-2xl font-semibold">Loading .....</h1>
      </div>
    );
  }

  if (!questionData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-semibold">
          Failed to load question data.
        </h2>
        <p className="mt-4 text-sm text-gray-500">
          Sometimes this can happen. Refresh the page or try again later.
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
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
            <a className="text-xl font-semibold text-white">MockMate</a>
            <details className="dropdown">
              <summary className="btn btn-ghost" aria-label="Dropdown Menu">
                <FaKey />
              </summary>
              <ul className="menu dropdown-content bg-black rounded-box z-[1] min-w-52 p-2 shadow">
                <li>
                  <CsrfCookieForm />
                </li>
              </ul>
            </details>
          </div>
          <div className="flex items-center space-x-4">
            <AlertDialogDemo response={questionData} />
            <DrawerDemo />
            <DrawerDemosub />
            <Timer />
            <div>
              <SignedOut>
                <SignInButton className="btn btn-primary w-10" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
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
    </Suspense>
  );
};

export default CodeEditorWithQuestion;
