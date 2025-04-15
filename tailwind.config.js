/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors'); // Import default colors

module.exports = {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan these files for Tailwind classes
     "./public/index.html"
  ],
  theme: {
    extend: {
      // Define your custom theme colors here
      colors: {
        // Using Emerald as the accent color based on previous requests
        primary: colors.emerald, // Use emerald palette for primary accent
        gray: colors.slate, // Use slate for gray tones (adjust as needed)
        // Example: primary-500 is emerald-500, primary-400 is emerald-400
        // You can access these in Tailwind as bg-primary-500, text-primary-400 etc.

        // Direct use of the specific teal color if preferred over palette:
        // accent: {
        //   DEFAULT: '#6AD9B2', // rgb(106, 217, 178)
        //   darker: '#4fbfaa',
        //   contrast: '#064e3b',
        //   light: 'rgba(106, 217, 178, 0.1)',
        // }
      },
      // Define custom fonts if needed
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', /* other fallbacks */],
        // Add other fonts like 'serif' or 'mono' if needed
      },
      // Define custom animations
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeInUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        slideDown: { 'from': { opacity: '0', transform: 'translateY(-15px)', maxHeight: '0' }, 'to': { opacity: '1', transform: 'translateY(0)', maxHeight: '1000px' } },
        pulseSlow: { '0%, 100%': { opacity: '0.8', transform: 'scale(1)' }, '50%': { opacity: '1', transform: 'scale(1.03)' } },
        heartPop: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.4)' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'pulse-slow': 'pulseSlow 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'heart-pop': 'heartPop 0.3s ease-in-out',
      }
    },
  },
  plugins: [
     require('@tailwindcss/forms'), // Optional: enhances form styling
  ],
}
