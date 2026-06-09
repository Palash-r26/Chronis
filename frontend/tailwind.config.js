/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        card: 'var(--color-card)',
        primary: '#7c3aed',
        secondary: '#a78bfa',
        warning: '#f87171',
        textPrimary: 'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
