import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import Split from "react-split";
import { CODE_SNIPPETS } from "./constants";
import LanguageSelector from "./LanguageSelector";
import QuestionPanel from "./QuestionPanel";
const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage] || ""); // Update the code snippet for the selected language
  };

  return (
    <div className="flex flex-col justify-start">
      <LanguageSelector
        selectedLanguage={language}
        onSelectLanguage={handleLanguageChange}
      />
      ,
      <Editor
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 18,
        }}
        height="100%"
        theme="vs-dark"
        language={language}
        defaultValue={CODE_SNIPPETS[language]}
        onMount={onMount}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </div>
  );
};

// const QuestionPanel = () => {
//   return (
//     <div
//       style={{
//         padding: "16px",
//         backgroundColor: "gray",
//         height: "100%",
//       }}
//     >
//       <h2>Question</h2>
//       <p>
//         Write a program that implements a binary search algorithm. The input is
//         a sorted array, and the output should indicate whether a given number is
//         present in the array.
//       </p>
//     </div>
//   );
// };

const CodeEditorWithQuestion = () => {
  return (
    <Split
      sizes={[55, 45]}
      minSize={200}
      gutterSize={14} // Width of the splitter bar
      gutterAlign="center"
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "#3a3a3a",
      }}
      gutter={() => {
        // Create a custom gutter element with a symbol
        const gutter = document.createElement("div");
        gutter.className = "custom-gutter";
        const symbol = document.createElement("div");
        symbol.className = "gutter-symbol ";
        symbol.innerHTML = "&#9679;"; // Unicode for a filled circle
        gutter.appendChild(symbol);
        return gutter;
      }}
    >
      <QuestionPanel />
      <CodeEditor />
    </Split>
  );
};

export default CodeEditorWithQuestion;
/*
Explnation 

1)Custom Gutter: The gutter function in the Split component allows you to create a custom element for the splitter bar. Here, we are assigning it the custom-gutter class.
2)CSS Styles: The default and hover styles for the custom-gutter class control the appearance of the splitter bar. When hovered, the background color changes to green (#00ff00).
3)Smooth Transition: The transition property ensures a smooth color change when hovering over the splitter.

*/
