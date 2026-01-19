import React from "react";
import { ScamChecker } from "./components/ScamChecker";

export default function App() {
  return (
    <div className="min-h-screen flex justify-center p-6">
      <div className="w-full max-w-3xl">
        <ScamChecker />
      </div>
    </div>
  );
}
