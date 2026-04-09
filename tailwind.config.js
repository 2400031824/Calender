/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        softPaper: '0 2px 4px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.45, 0, 0.55, 1)',
      },
    },
  },
  plugins: [],
};
