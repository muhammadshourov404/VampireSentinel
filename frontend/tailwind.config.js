/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vampire-dark': '#0a0a0a',
        'blood-red': '#8B0000',
        'neon-red': '#FF0000',
        'crimson': '#DC143C',
        'alert-orange': '#FF4500',
        'terminal-gray': '#AAAAAA',
      },
      animation: {
        'glow': 'glow 3s infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { textShadow: '0 0 10px #FF0000' },
          'to': { textShadow: '0 0 40px #FF4500, 0 0 60px #DC143C' },
        }
      }
    },
  },
  plugins: [],
}
