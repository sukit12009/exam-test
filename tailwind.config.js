/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      // Add any custom theme extensions here
      colors: {
        // Define custom colors if needed
      },
    },
  },
  variants: {
    extend: {
      // Enable dark mode variants for utilities
      backgroundColor: ['dark'],
      textColor: ['dark'],
      borderColor: ['dark'],
      ringColor: ['dark'],
      boxShadow: ['dark'],
      // Add more variants as needed
    },
  },
  plugins: [],
}
