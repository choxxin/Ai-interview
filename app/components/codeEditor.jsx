import React, { useRef, useState, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";

const CodeEditor = ({ codeSnippets, slug, exampleTestcaseList, id }) => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState(() => {
    // Retrieve language from local storage or default to JavaScript
    return localStorage.getItem("preferredLanguage") || "javascript";
  });

  const CODE_SNIPPETS = {
    javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp: `using System;\n\nnamespace HelloWorld\n{\n\tclass Hello {\n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n`,
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
    cpp: `\nclass Solution{\n\t\tpublic:\n\t\t\tvoid sayHello(){\n\t\t\tcout<<"Hello World in C++"<<endl;\n\t\t}\n};\n\nint main(){\n\tSolution obj;\n\tobj.sayHello();\n\treturn 0;\n}`,
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello World in Go")\n}\n',
    rust: `fn main() {\n\tprintln!("Hello World in Rust");\n}\n`,
    c: `#include <stdio.h>\n\nint main() {\n\tprintf("Hello World in C");\n\treturn 0;\n}\n`,
    python3: `print("Hello World in Python 3")\n`,
  };

  // Update code snippets with provided data
  useEffect(() => {
    const updatedSnippets = { ...CODE_SNIPPETS };
    codeSnippets.forEach((snippet) => {
      const lang = snippet.language.toLowerCase();
      if (lang === "c++") {
        updatedSnippets.cpp = snippet.code;
      } else if (lang === "c#") {
        updatedSnippets.csharp = snippet.code;
      } else if (updatedSnippets[lang] !== undefined) {
        updatedSnippets[lang] = snippet.code;
      }
    });
    // Update the value if the current language has changed snippets
    setValue(updatedSnippets[language] || "");
  }, [codeSnippets, language]);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    setValue(CODE_SNIPPETS[newLanguage] || "");
    // Save the selected language to local storage
    localStorage.setItem("preferredLanguage", newLanguage);
  };

  return (
    <div className="flex flex-col justify-start">
      <LanguageSelector
        slug={slug}
        selectedLanguage={language}
        value={value}
        onSelectLanguage={handleLanguageChange}
        exampleTestcaseList={exampleTestcaseList}
        id={id}
      />
      <Editor
        options={{
          minimap: { enabled: false },
          fontSize: 18,
        }}
        height="100%"
        theme="vs-dark"
        language={language}
        defaultValue={CODE_SNIPPETS[language] || ""}
        onMount={onMount}
        value={value}
        onChange={(val) => setValue(val)}
      />
    </div>
  );
};

export default CodeEditor;
//meoww
