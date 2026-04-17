/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#175a9c',
          dark: '#0f3d6b',
          light: '#2a7bc8',
          soft: '#e8f2fc',
          muted: '#4a8fd4',
        },
        secondary: {
          DEFAULT: '#d4a017',
          dark: '#b8890f',
          light: '#e8b82a',
          soft: '#fdf8e8',
          muted: '#e6c04a',
        },
        cream: {
          DEFAULT: '#faf9f6',
          dark: '#f5f3ef',
        },
      },
      height: {
        '18': '4.5rem',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 6px -1px rgba(23, 90, 156, 0.1), 0 2px 4px -2px rgba(212, 160, 23, 0.06)',
        'card-hover': '0 20px 28px -8px rgba(23, 90, 156, 0.14), 0 10px 16px -6px rgba(212, 160, 23, 0.12)',
        'soft': '0 2px 12px rgba(23, 90, 156, 0.08)',
      },
      backgroundImage: {
        'hero-pattern': 'radial-gradient(ellipse 85% 55% at 50% -15%, rgba(23, 90, 156, 0.22), transparent), radial-gradient(ellipse 55% 45% at 100% 40%, rgba(212, 160, 23, 0.18), transparent), radial-gradient(ellipse 50% 50% at 0% 85%, rgba(13, 148, 136, 0.12), transparent)',
        'grid-pattern': 'linear-gradient(rgba(23, 90, 156, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23, 90, 156, 0.045) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
