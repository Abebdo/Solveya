import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow fade-in">
      <h1 className="text-3xl font-bold text-primary mb-4">About Scam Checker Pro</h1>

      <p className="text-gray-700 leading-relaxed mb-4">
        Scam Checker Pro is a fast and intelligent message analysis tool designed to help users
        detect potential scams, phishing attempts, fraudulent job offers, fake romance messages,
        and unsafe links.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Every analysis is performed <strong>locally on your device</strong>. We do not store,
        upload, or share any text you enter. Your privacy and safety are our top priorities.
      </p>

      <p className="text-gray-700 leading-relaxed">
        The system uses a rule-based detection engine built from 20+ proven scam indicators
        collected from cybersecurity research, user reports, and anti-fraud investigations.
      </p>
    </div>
  );
}
