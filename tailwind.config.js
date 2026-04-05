/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'edge-bg': '#0f0f10',
        'edge-surface': '#1a1a1c',
        'edge-border': '#2a2b2f',
        'edge-accent': '#e3e3e3',
      }
    },
  },
  plugins: [],
}
