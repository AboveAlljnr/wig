/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'Times New Roman', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        bone: {
          DEFAULT: '#FAF3E3',
          warm: '#FDF8EE',
        },
        charcoal: {
          DEFAULT: '#0D0D0D',
          soft: '#1E1E1E',
          hover: '#2A2A2A',
        },
        gold: {
          DEFAULT: '#C8860F',
          light: '#E4A832',
          dark: '#9B6A08',
        },
        grey: {
          subtle: '#E8DFCF',
          mid: '#B8A98E',
          dark: '#6B5E4B',
        },
      },
    },
  },
  plugins: [],
};
