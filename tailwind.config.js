/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'snake': {
          'head': '#4ade80',
          'body': '#22c55e',
          'tail': '#16a34a',
        },
        'food': '#ef4444',
        'board': '#1e293b',
        'cell': '#334155',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}