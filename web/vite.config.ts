import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/record': 'http://localhost:8080',
      '/login': 'http://localhost:8080',
      '/refresh': 'http://localhost:8080',
    }
  }
})
