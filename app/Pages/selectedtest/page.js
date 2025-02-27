"use client";

import { useState, useEffect } from "react";
import Split from "react-split";
import QuestionPanel from "@/app/components/QuestionPanel";
import CodeEditor from "@/app/components/CodeEditor";
import { toast } from "@/hooks/use-toast";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import dataset from "@/app/components/const";
import Stopwatch from "@/app/components/Timertest";
import { FaKey } from "react-icons/fa6";
import useResultStore from "@/app/Zustand/resultresponse";
import CsrfCookieForm from "@/app/components/CsrfCookieForm";
import { DrawerDemo } from "@/app/components/Drawer";
import { DrawerDemosub } from "@/app/components/Drawersub";
import { AlertDialogDemo } from "../../components/Alertdial";
import { useRouter } from "next/navigation";
const CodeEditorWithQuestion = () => {
  const difficultyMap = { easy: 1, medium: 2, hard: 3 };
  const [questions, setQuestions] = useState([]); // Holds loaded questions
  const [currentQuestion, setCurrentQuestion] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [difficultySequence, setDifficultySequence] = useState(null); // Initially null

  const totalQuestions = 3; // Total number of questions to load
  const { Result, hasId, clearResults } = useResultStore();
  const [Cookie, setCookie] = useState(null);

  const [Xcsrf, setXcsrf] = useState(null);
  const isAnswered1 = questions[0] ? hasId(questions[0].id) : false;
  const isAnswered2 = questions[1] ? hasId(questions[1].id) : false;
  const isAnswered3 = questions[2] ? hasId(questions[2].id) : false;
  const router = useRouter(); // Hook for navigation
  const handleFinish = () => {
    router.push("/Pages/thank"); // Navigate to the Thank You page
  };
  useEffect(() => {
    const savedCookie = localStorage.getItem("Cookie");
    const savedXcsrf = localStorage.getItem("X-CSRF-Token");
    setXcsrf(savedXcsrf);
    setCookie(savedCookie);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selections = params.get("selections");

    if (selections) {
      try {
        clearResults();
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
  }, []);

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
      }, 20000); // 60 seconds
    }

    // Cleanup timeout when loading stops or component unmounts
    return () => clearTimeout(timeout);
  }, [isLoading]);

  // Fetch question details
  const fetchQuestion = async (slug) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/scrap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: `https://leetcode.com/problems/${slug}/description`,
            Cookie: Cookie,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch question data");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching question data:", error);
      return null;
    }
  };

  // const fetchQuestion = async (slug) => {
  //   try {
  //     const response = await fetch(
  //       `https://leetcode.com/problems/${slug}/description`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "User-Agent":
  //             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
  //           Accept:
  //             "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  //           Referer: "http://localhost:3000/",
  //           "Sec-CH-UA":
  //             '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
  //           "Sec-CH-UA-Mobile": "?0",
  //           "Sec-CH-UA-Platform": '"Windows"',
  //           "Sec-Fetch-Site": "same-origin",
  //           "Sec-Fetch-Mode": "navigate",
  //           "Sec-Fetch-User": "?1",
  //           Cookie: Cookie, // Ensure this contains a valid session cookie
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error(
  //         `Failed to fetch question data. Status: ${response.status}`
  //       );
  //     }

  //     // Parse response as text (HTML content)
  //     const html = await response.text();
  //     return html;
  //   } catch (error) {
  //     console.error("Error fetching question data:", error);
  //     return null;
  //   }
  // };

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
          <a className="text-xl font-semibold text-white">MockMate</a>
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
            className="btn btn-sm text-white rounded bg-black hover:bg-gray-700 transition px-4 py-2"
            onClick={handleFinish}
          >
            Finish
          </button>
          <button className={`btn btn-sm text-white rounded bg-black`}>
            {Result.length}/3
          </button>
          <AlertDialogDemo response={currentQuestion} />
          <button
            className={`btn btn-sm text-white rounded ${
              isAnswered1 ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => setCurrentQuestion(questions[0])}
          >
            Q1
          </button>
          <button
            className={`btn btn-sm text-white rounded ${
              isAnswered2 ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => setCurrentQuestion(questions[1])}
          >
            Q2
          </button>
          <button
            className={`btn btn-sm text-white rounded ${
              isAnswered3 ? "bg-green-500" : "bg-blue-500"
            }`}
            onClick={() => setCurrentQuestion(questions[2])}
          >
            Q3
          </button>
          <DrawerDemo />
          <DrawerDemosub />
          <Stopwatch />

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
