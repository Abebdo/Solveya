import React from "react";

interface Props {
  score: number;
}

export default function ResultCard({ score }: Props) {
  const color =
    score < 20
      ? "text-green-600"
      : score < 50
      ? "text-yellow-600"
      : score < 80
      ? "text-orange-600"
      : "text-red-600";

  return (
    <div className="p-5 bg-gray-100 rounded-lg text-center">
      <h2 className="text-xl font-bold mb-2">Risk Score</h2>
      <p className={`text-4xl font-extrabold ${color}`}>{score}%</p>
    </div>
  );
}
