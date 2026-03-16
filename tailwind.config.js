/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        whatsapp: '#25d366',
        surface: '#ffffff',
        'surface-dark': '#1e293b',
        background: '#f8fafc',
        'background-dark': '#0f172a',
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.06)',
        'elevated': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 30px -5px rgba(37, 99, 235, 0.25)',
      },
    },
  },
  plugins: [],
}
