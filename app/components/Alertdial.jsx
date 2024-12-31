import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FiCopy } from "react-icons/fi"; // Importing copy icon
import useAistore from "../Zustand/airesponse";
import { useToast } from "@/hooks/use-toast";
const { GoogleGenerativeAI } = require("@google/generative-ai");

export function AlertDialogDemo(response) {
  const { Airesponse, Ailoading, setAi, setAiLoading } = useAistore();
  const [aiAns, setaiAns] = useState("Loading...");
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(aiAns);
    toast({
      title: "Copied to clipboard",
    });
  };

  const Ai = async () => {
    try {
      setAiLoading(true); // Indicate that AI processing has started
      setaiAns("Loading...");
      const pl = localStorage.getItem("preferredLanguage") || "javascript";

      const responseString = JSON.stringify(response, null, 2);

      const prompt = `
        Based on the following coding problem, provide the solution in the language specified also add comments in the code for better understanding.
        Language: ${pl}
        Problem Details: ${responseString}
      `;

      const genAI = new GoogleGenerativeAI(
        "AIzaSyDaXDH551cj151vYkjvQobn4S0R52DVTME"
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(prompt);

      let aiResponse = "No valid response found";

      // Check if candidates exist and contain valid content
      if (
        result &&
        result.response &&
        result.response.candidates &&
        result.response.candidates.length > 0
      ) {
        const candidate = result.response.candidates[0];
        if (
          candidate.content &&
          candidate.content.parts &&
          candidate.content.parts.length > 0
        ) {
          aiResponse = candidate.content.parts[0].text || "No valid response";
        }
      }

      setAi(aiResponse);
      setaiAns(aiResponse);
      console.log("AI response:", aiResponse);
      console.log("AI response:", aiAns);
    } catch (error) {
      console.error("Error contacting Gemini API:", error);
      alert("Failed to get a response from the Gemini API.");
    } finally {
      setAiLoading(false); // Reset loading state
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={Ai}
          variant="outline"
          className="bg-black text-white  "
        >
          AI
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1025px] p-6 rounded-lg shadow-lg bg-gray-800 text-white">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-white">
            AI-Generated Code
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-gray-300 max-w-[980px]">
          {Ailoading ? (
            <p>Fetching response...</p>
          ) : (
            <div className="relative">
              <pre className="text-white bg-gray-900 p-4 rounded-md max-h-[500px] overflow-auto border border-gray-700">
                {aiAns}
              </pre>
              <Button
                onClick={handleCopy}
                className="absolute top-4 right-4 bg-blue-600 text-white p-2 rounded-md shadow-md hover:bg-blue-500"
              >
                <FiCopy size={18} />
                Copy
              </Button>
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
