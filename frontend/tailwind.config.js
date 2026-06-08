/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0A0F',
        surface: '#13131A',
        card: '#1C1C26',
        primary: '#6C63FF',
        secondary: '#00D4AA',
        warning: '#FF6B6B',
        textPrimary: '#F0F0FF',
        textSecondary: '#8888AA',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
