/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff8f3',
          100: '#ffe8d5',
          200: '#ffc99a',
          300: '#ffa05e',
          400: '#ff8c42',
          500: '#FF6B1A',
          600: '#e8521a',
          700: '#c43d10',
          800: '#9e2f0c',
          900: '#7a2209',
        },
        teal: {
          50: '#f0fafb',
          100: '#cceff2',
          200: '#99dfe5',
          300: '#5ccad3',
          400: '#14A8B2',
          500: '#0B7B83',
          600: '#075C63',
          700: '#054a50',
          800: '#033840',
          900: '#022830',
        },
        gold: {
          300: '#FBBF5A',
          400: '#F5A623',
          500: '#D4891A',
        },
        india: {
          navy: '#0E1020',
          card: '#161828',
          border: '#252840',
        },
        dark: {
          900: '#0E1020',
          800: '#161828',
          700: '#252840',
          card: '#161828',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      boxShadow: {
        'saffron': '0 4px 20px rgba(255, 107, 26, 0.3)',
        'saffron-lg': '0 8px 30px rgba(255, 107, 26, 0.4)',
        'teal': '0 4px 20px rgba(11, 123, 131, 0.3)',
        'card': '0 2px 16px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
