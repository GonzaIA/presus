/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    preflight: false, // Desactiva el reset de estilos base si es necesario
  },
  theme: {
    extend: {
      colors: {
        primary: '#2463eb',
        whatsapp: '#10B981',
        'background-light': '#F8FAFC',
        'background-dark': '#111621',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        '2xl': '1.25rem',
        full: '9999px',
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(37, 99, 235, 0.05), 0 8px 10px -6px rgba(37, 99, 235, 0.05)',
        'item': '0 8px 30px rgb(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
}