import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ScamChecker } from "./components/ScamChecker";

export default function App() {
  return (
    <>
      <Header />
      <div className="min-h-screen flex justify-center p-6 pt-2">
        <div className="w-full max-w-3xl">
          <ScamChecker />
        </div>
      </div>
      <Footer />
    </>
  );
}
