import React from "react";

interface Props {
  value: string;
  setValue: (v: string) => void;
  onAnalyze: () => void;
}

export default function InputBox({ value, setValue, onAnalyze }: Props) {
  return (
    <div className="space-y-3">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste the message you want to check..."
        className="w-full h-40 border border-gray-300 rounded-lg p-4 focus:outline-primary"
      />

      <button
        onClick={onAnalyze}
        disabled={value.trim().length < 5}
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300"
      >
        Analyze for Scam
      </button>
    </div>
  );
}
