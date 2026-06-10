import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (['react', 'react-dom', 'react-router-dom', 'axios'].some(pkg => id.includes(`node_modules/${pkg}`))) {
              return 'vendor';
            }
            if (['framer-motion', 'lucide-react', 'recharts'].some(pkg => id.includes(`node_modules/${pkg}`))) {
              return 'ui';
            }
          }
        }
      }
    }
  }
})
