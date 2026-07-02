/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0d2c54',
          light: '#123a6e',
          dark: '#081d38',
        },
        orange: {
          DEFAULT: '#f5821f',
          light: '#ff9a3d',
        },
        teal: {
          DEFAULT: '#0e8a7d',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out both',
        'fade-in': 'fadeIn 1s ease-out both',
        float: 'float 4s ease-in-out infinite',
        'gradient-move': 'gradientMove 8s ease infinite',
        'pulse-soft': 'pulseSoft 2.5s ease-in-out infinite',
      },
      backgroundSize: {
        '200%': '200% 200%',
      },
    },
  },
  plugins: [],
}
