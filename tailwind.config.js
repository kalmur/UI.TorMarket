/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-tor-red': 'var(--primary-tor-red)',
        'primary-bg-color': 'var(--primary-bg-color)',
      },
    },
  },
  plugins: [],
}