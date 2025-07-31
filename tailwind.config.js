// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This line is crucial for scanning your React components
    "./public/index.html", // Also include your public HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};