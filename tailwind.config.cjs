/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      boxShadow: { soft: "0 8px 30px rgba(0,0,0,0.08)" },
    },
  },
  plugins: [],
};
