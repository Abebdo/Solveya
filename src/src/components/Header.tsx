import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 mb-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-primary">Scam Checker Pro</h1>

      <nav className="space-x-6 text-gray-600 font-medium">
        <a href="/" className="hover:text-primary transition">Home</a>
        <a href="/about" className="hover:text-primary transition">About</a>
      </nav>
    </header>
  );
}
