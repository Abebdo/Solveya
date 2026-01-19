import React from "react";

export default function SuggestionsBox({ suggestions }: { suggestions: string[] }) {
  if (suggestions.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h3 className="text-blue-700 font-semibold mb-2">Recommended Action</h3>
      <ul className="list-disc ml-6">
        {suggestions.map((s, idx) => (
          <li key={idx} className="text-blue-600">{s}</li>
        ))}
      </ul>
    </div>
  );
}
