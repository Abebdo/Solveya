import React from "react";

export default function Footer() {
  return (
    <footer className="w-full text-center py-6 mt-10 text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Scam Checker Pro — All Rights Reserved.</p>
      <p className="mt-2">We never store your messages. 100% privacy guaranteed.</p>
    </footer>
  );
}
