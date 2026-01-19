/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        danger: "#dc2626",
        success: "#16a34a",
        warn: "#eab308"
      }
    }
  },
  plugins: []
};
