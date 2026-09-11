/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'rgba(217,164,65,0.15)',
        background: '#0d0b08',
        foreground: '#f6efe1',
        primary: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        gold: {
          DEFAULT: '#d9a441',
          deep: '#b37b22',
          pale: '#f3e0ad',
        },
        cream: '#f6efe1',
        char: '#17130f',
        wood: {
          DEFAULT: '#241a12',
          light: '#2f2318',
        },
        ember: '#c1440e',
      },
    },
  },
  plugins: [],
};