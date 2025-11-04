/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'tv-black': '#0a0a0a',
        'tv-gray': '#1a1a1a',
        'tv-blue': '#0066cc',
        'tv-red': '#cc0000',
        'tv-green': '#00cc66',
      },
      fontFamily: {
        'tv': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
