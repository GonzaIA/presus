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
        primary: '#3c83f6',
        'primary-dark': '#2563eb',
        'primary-light': '#60a5fa',
        accent: '#06b6d4',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        whatsapp: '#25d366',
        surface: '#1e293b',
        'surface-dark': '#0f172a',
        background: '#0F172A',
        'background-dark': '#0F172A',
        'background-light': '#f5f7f8',
        midnight: '#0f172a',
        'midnight-light': '#1e293b',
        'glass-bg': 'rgba(30, 41, 59, 0.7)',
        'glass-border': 'rgba(255, 255, 255, 0.1)',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'text-muted': '#64748b',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
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
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glass-hover': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'glow-blue': '0 0 40px -10px rgba(59, 130, 246, 0.4)',
        'glow-primary': '0 0 20px -5px rgba(60, 131, 246, 0.3)',
      },
      backdropBlur: {
        'glass': '12px',
      },
    },
  },
  plugins: [],
}
