"use client";
import React, { useState, useEffect } from "react";

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

export default CsrfCookieForm;
