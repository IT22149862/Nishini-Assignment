/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"Jost"', 'sans-serif'],
      },
      colors: {
        cream:  '#F6F1E9',
        dark:   '#18181A',
        forest: '#1E4D2B',
        sage:   '#4A7C59',
        gold:   '#C9A84C',
        'light-sage': '#E8F0EA',
        'warm-gray': '#6B6860',
      },
    },
  },
  plugins: [],
}
