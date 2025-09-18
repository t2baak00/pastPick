/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
  ],
  darkMode: 'class', // Add this line
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        pastpick: {
          primary: '#2563eb',
          secondary: '#10b981',
          accent: '#f59e0b',
          danger: '#ef4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}