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
            'twitter-blue': '#1d9bf0',
            'raisin-black': '#212327',
            'onyx': '#333639',
            'black-rgba': 'rgba(0,0,0,0.3)'
        }
      }
    },
    plugins: [],
  }