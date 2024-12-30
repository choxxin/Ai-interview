"use client";
import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FaKey } from "react-icons/fa6";
const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(true);
  const router = useRouter();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navigateTo = (path) => {
    router.push(path);
  };
  const CsrfCookieForm = () => {
    const [csrfToken, setCsrfToken] = useState("");
    const [cookie, setCookie] = useState("");

    // Load saved values from localStorage on component mount
    useEffect(() => {
      const savedCsrfToken = localStorage.getItem("X-CSRF-Token");
      const savedCookie = localStorage.getItem("Cookie");

      if (savedCsrfToken) setCsrfToken(savedCsrfToken);
      if (savedCookie) setCookie(savedCookie);
    }, []);

    // Save values to localStorage
    const handleSave = () => {
      localStorage.setItem("X-CSRF-Token", csrfToken);
      localStorage.setItem("Cookie", cookie);
      alert("Values saved to localStorage!");
    };

    return (
      <div className="flex flex-col items-center space-x-4">
        {/* CSRF Token Input */}
        <div>
          <label htmlFor="csrfToken" className="block text-sm text-white">
            X-CSRF-Token:
          </label>
          <input
            id="csrfToken"
            type="text"
            value={csrfToken}
            onChange={(e) => setCsrfToken(e.target.value)}
            placeholder="Enter CSRF Token"
            className="rounded px-2 py-1 text-black w-60"
          />
        </div>

        {/* Cookie Input */}
        <div>
          <label htmlFor="cookie" className="block text-sm text-white">
            Cookie:
          </label>
          <input
            id="cookie"
            type="text"
            value={cookie}
            onChange={(e) => setCookie(e.target.value)}
            placeholder="Enter Cookie"
            className="rounded px-2 py-1 text-black w-60"
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800" // Improved text color for day mode
      }`}
    >
      {/* Navbar */}
      <nav
        className={`flex justify-between items-center px-6 py-4 ${
          darkMode ? "border-b border-gray-700" : "border-b border-gray-300"
        }`}
      >
        <div className="text-xl font-bold cursor-pointer">
          MockMate
          <SignedIn>
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
                <FaKey color={darkMode ? "white" : "black"} />
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
          </SignedIn>
        </div>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton className="btn btn-primary" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center py-16 text-center px-6">
        <h1 className="text-5xl font-bold">Ace Your Coding Skills</h1>
        <p className="mt-4 text-lg">
          Practice coding questions or take curated tests tailored for you.
        </p>
        <div className="mt-8 flex space-x-4">
          <button
            className="px-6 py-3 text-lg font-semibold rounded bg-blue-600 text-white hover:bg-blue-500"
            onClick={() => navigateTo("/Pages/testselector")}
          >
            Start Test
          </button>
          <button
            className="px-6 py-3 text-lg font-semibold rounded bg-green-600 text-white hover:bg-green-500"
            onClick={() => navigateTo("/Pages/linkselector")}
          >
            Solve a Question
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold">Solve Any Question</h3>
            <p className="mt-2">
              Access any coding question on LeetCode directly through our
              platform.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold">Curated Tests</h3>
            <p className="mt-2">
              Take personalized tests to improve your skills effectively.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h3 className="text-xl font-semibold">Track Progress</h3>
            <p className="mt-2">
              Monitor your improvements and get insights into your coding
              journey.
            </p>
          </div>
        </div>
      </section>

      {/* Tutorial Section */}
      <section
        className={`py-16 px-6 ${
          darkMode ? "bg-gray-700" : "bg-gray-200"
        } rounded-lg`}
      >
        <h2 className="text-3xl font-bold text-center">
          How to Link Your LeetCode Account
        </h2>
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              Watch the video below to learn how to find your X-CSRF token and
              login cookie for seamless integration with our platform.
            </p>
            <video
              controls
              className="w-full rounded-lg shadow-md"
              src="/assets/MeowMeow.mp4"
            ></video>
          </div>
          <div>
            <p className="mb-10 font-semibold">
              Where to paste your cookie and x-csrf token
            </p>
            <img
              className="rounded-lg shadow-md"
              src="/assets/passout.png"
              alt="X-CSRF Token Example"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-6 text-center ${
          darkMode ? "border-t border-gray-700" : "border-t border-gray-300"
        }`}
      >
        <p className="text-sm">
          &copy; {new Date().getFullYear()} MockMate. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
