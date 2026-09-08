/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foodlink: {
          black: '#0d0b08',
          charcoal: '#17130f',
          wood: '#241a12',
          'wood-light': '#2f2318',
          gold: '#d9a441',
          'gold-deep': '#b37b22',
          'gold-pale': '#f3e0ad',
          cream: '#f6efe1',
          ember: '#c1440e',
        },
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 8px 20px -6px rgba(217,164,65,0.45)',
        'card-hover': '0 16px 32px -12px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}