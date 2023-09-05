/** @type {import('tailwindcss').Config} */
module.exports = {
    // Paths to template files
    content: [
      './src/pages/**/*.{js,jsx}',
      './src/components/**/*.{js,jsx}'
    ],
    theme: {
      extend: {
        colors:{
            'twitter-blue': '#1d9bf0'
        }
      }
    },
    plugins: [],
  }