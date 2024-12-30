"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Split from "react-split";
import QuestionPanel from "@/app/components/QuestionPanel";
import CodeEditor from "@/app/components/CodeEditor";
import { toast } from "@/app/hook/use-toast";
import dataset from "@/app/components/const";
import Stopwatch from "@/app/components/Timertest";
import { FaKey } from "react-icons/fa6";
import CsrfCookieForm from "@/app/components/CsrfCookieForm";
import { DrawerDemo } from "@/app/components/Drawer";
import { DrawerDemosub } from "@/app/components/Drawersub";
const CodeEditorWithQuestion = () => {
  const searchParams = useSearchParams();
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };
  const [questions, setQuestions] = useState([]); // Holds loaded questions
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [difficultySequence, setDifficultySequence] = useState(null); // Initially null

  const totalQuestions = 3; // Total number of questions to load

  // Parse query parameters for difficulty sequence
  useEffect(() => {
    const selections = searchParams.get("selections");
    if (selections) {
      try {
        const parsedSelections = JSON.parse(selections);
        setDifficultySequence(parsedSelections);
        // console.log("Custom difficulty sequence:", parsedSelections);
      } catch (error) {
        console.error("Error parsing difficulty sequence:", error);
        toast({
          title: "Error",
          description:
            "Unable to parse difficulty sequence from query parameters.",
        });
      }
    } else {
      setDifficultySequence(["easy", "easy", "medium"]); // Default sequence
    }
  }, [searchParams]);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      // Set a timeout to check after 1 minute
      timeout = setTimeout(() => {
        toast({
          title: "Sometimes, things just don't work out.",

          description:
            "Loading is taking longer than expected. It could be due to Leetcode limiting your requests , please wait or try again later",
        });
      }, 10000); // 60 seconds
    }

    // Cleanup timeout when loading stops or component unmounts
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Fetch question details
  const fetchQuestion = async (slug) => {
    try {
      const response = await fetch("http://localhost:3000/api/scrap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: `https://leetcode.com/problems/${slug}/description`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch question data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching question data:", error);
      return null;
    }
  };

  // Load questions after difficultySequence is set
  useEffect(() => {
    if (!difficultySequence) return; // Wait until difficultySequence is set

    const loadQuestions = async () => {
      console.log(difficultySequence);
      setIsLoading(true);
      const loadedQuestions = [];
      const availableQuestions = dataset.stat_status_pairs;

      for (let difficulty of difficultySequence) {
        let found = false;

        while (!found) {
          const candidates = availableQuestions.filter(
            (q) => q.difficulty.level === difficultyMap[difficulty]
          );

          if (candidates.length === 0) {
            console.error(
              `No questions available for difficulty: ${difficulty}`
            );
            break;
          }

          const randomQuestion =
            candidates[Math.floor(Math.random() * candidates.length)];

          try {
            const questionData = await fetchQuestion(
              randomQuestion.stat.question__title_slug
            );

            if (questionData) {
              loadedQuestions.push(questionData);
              setQuestions([...loadedQuestions]);
              found = true;
            }
          } catch (error) {
            console.warn(
              `Fetching failed, retrying for difficulty: ${difficulty}`
            );
          }
        }
      }

      setCurrentQuestion(loadedQuestions[0] || null);
      setIsLoading(false);

      if (loadedQuestions.length < difficultySequence.length) {
        toast({
          title: "Warning",
          description:
            "Could not load all required questions. Please try again.",
        });
      }
    };

    loadQuestions();
  }, [difficultySequence]);

  // Calculate loading percentage
  const calculateLoadingPercentage = () => {
    return Math.round((questions.length / totalQuestions) * 100);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-screen bg-gray-900 text-gray-200">
        <img src="/assets/loading.gif" alt="Loading" className="w-50 h-50" />
        <h1 className="text-2xl font-semibold">Loading...</h1>
        <progress
          className="progress w-56"
          value={calculateLoadingPercentage()}
          max="100"
        ></progress>
        <span className="text-sm font-semibold">
          {questions.length} / {totalQuestions}
        </span>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-200">
        <h2 className="text-2xl font-semibold">Failed to load questions.</h2>
      </div>
    );
  }

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
          <button
            className="btn btn-sm bg-blue-500 text-white rounded"
            onClick={() => setCurrentQuestion(questions[0])}
          >
            Q1
          </button>
          <button
            className="btn btn-sm bg-green-500 text-white rounded"
            onClick={() => setCurrentQuestion(questions[1])}
          >
            Q2
          </button>
          <button
            className="btn btn-sm bg-purple-500 text-white rounded"
            onClick={() => setCurrentQuestion(questions[2])}
          >
            Q3
          </button>
          <DrawerDemo />
          <DrawerDemosub />
          <Stopwatch />
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
          title={currentQuestion.title}
          id={currentQuestion.id}
          description={currentQuestion.description}
          difficulty={currentQuestion.difficulty}
          stats={currentQuestion.stats}
        />

        <CodeEditor
          codeSnippets={currentQuestion.codeSnippets}
          slug={currentQuestion.slug}
          exampleTestcaseList={currentQuestion.exampleTestcaseList}
          id={currentQuestion.id}
        />
      </Split>
    </div>
  );
};

export default CodeEditorWithQuestion;
