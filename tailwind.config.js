/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TV Colors (work in both modes)
        'tv-black': '#0a0a0a',
        'tv-gray': '#1a1a1a',
        'tv-blue': '#0066cc',
        'tv-red': '#cc0000',
        'tv-green': '#00cc66',
        
        // Light mode colors
        'bg-light': '#ffffff',
        'bg-light-secondary': '#f8fafc',
        'bg-light-tertiary': '#f1f5f9',
        'text-light': '#1e293b',
        'text-light-secondary': '#64748b',
        'border-light': '#e2e8f0',
        'border-light-secondary': '#cbd5e1',
        
        // Dark mode colors (existing)
        'bg-dark': '#0a0a0a',
        'bg-dark-secondary': '#1a1a1a',
        'bg-dark-tertiary': '#2a2a2a',
        'text-dark': '#ffffff',
        'text-dark-secondary': '#94a3b8',
        'border-dark': '#374151',
        'border-dark-secondary': '#4b5563',
      },
      fontFamily: {
        'tv': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
