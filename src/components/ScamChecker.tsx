import React, { useState } from "react";
import { analyzeScam } from "../engine/scamEngine";
import InputBox from "./InputBox";
import ResultCard from "./ResultCard";
import CategoryTag from "./CategoryTag";
import SuggestionsBox from "./SuggestionsBox";
import Loader from "./Loader";

export function ScamChecker() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runAnalysis = () => {
    if (input.trim().length < 5) return;

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      try {
        const analysis = analyzeScam(input);
        setResult(analysis);
      } catch (error) {
        console.error("Analysis error:", error);
        setResult({
          score: 0,
          redFlags: [],
          greenFlags: [],
          category: null,
          suggestions: ["Error analyzing message. Please try again."]
        });
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 space-y-6 fade-in">
      
      <InputBox value={input} setValue={setInput} onAnalyze={runAnalysis} />

      {loading && <Loader />}

      {result && !loading && (
        <div className="space-y-4 fade-in">
          <ResultCard score={result.score} />

          <div className="flex justify-center fade-in">
            <CategoryTag category={result.category} />
          </div>

          <SuggestionsBox suggestions={result.suggestions} />

          <div className="bg-gray-100 rounded-lg p-4 fade-in">
            <h3 className="font-semibold text-gray-800 mb-2">Red Flags</h3>

            {result.redFlags.length === 0 ? (
              <p className="text-green-600 text-sm">No red flags detected.</p>
            ) : (
              <ul className="list-disc ml-6 space-y-1">
                {result.redFlags.map((flag: any) => (
                  <li key={flag.id} className="text-red-600">
                    <span className="font-semibold">
                      [{flag.severity.toUpperCase()}]
                    </span>{" "}
                    {flag.message}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-gray-100 rounded-lg p-4 fade-in">
            <h3 className="font-semibold text-gray-800 mb-2">Green Flags</h3>
            {result.greenFlags.length === 0 ? (
              <p className="text-gray-600 text-sm">No green flags.</p>
            ) : (
              <ul className="list-disc ml-6 space-y-1">
                {result.greenFlags.map((flag: any, idx: number) => (
                  <li key={idx} className="text-green-700">
                    {flag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
