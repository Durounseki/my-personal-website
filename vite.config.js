import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      '/resume':{
        target: 'http://localhost:8080/api',
        changeOrigin: true
      }
    }
  }
})
