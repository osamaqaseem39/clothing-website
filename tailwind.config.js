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
        primary: {
          50: '#fdfdd4',
          100: '#fdfdd4',
          200: '#f9f9c7',
          300: '#f5f5ba',
          400: '#f1f1ad',
          500: '#fdfdd4',
          600: '#d4b572',
          700: '#b38725',
          800: '#9a6f1f',
          900: '#815719',
        },
        secondary: {
          50: '#f5f3f0',
          100: '#e6e0d6',
          200: '#d4b572',
          300: '#c4a15a',
          400: '#b38725',
          500: '#b38725',
          600: '#9a6f1f',
          700: '#815719',
          800: '#684013',
          900: '#4f2f0d',
        },
        accent: {
          50: '#f5f3f0',
          100: '#e6e0d6',
          200: '#d4b572',
          300: '#c4a15a',
          400: '#b38725',
          500: '#b38725',
          600: '#9a6f1f',
          700: '#815719',
          800: '#684013',
          900: '#4f2f0d',
        },
      },
      fontFamily: {
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}