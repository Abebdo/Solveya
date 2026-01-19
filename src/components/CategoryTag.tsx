import React from "react";

export default function CategoryTag({ category }: { category: string | null }) {
  if (!category) return null;

  const labels: Record<string, string> = {
    email: "Email Scam",
    link: "Suspicious Link",
    job: "Job Offer Scam",
    romance: "Romance Scam",
    investment: "Investment Scam",
    "tech-support": "Tech Support Scam"
  };

  return (
    <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
      {labels[category] || "Potential Scam"}
    </div>
  );
}
