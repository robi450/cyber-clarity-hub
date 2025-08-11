import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  base: '/cyber-clarity-hub/',   // 👈 must match your repo name exactly
  // dev-only proxy is fine to keep; it’s ignored on build
  server: {
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true }
    }
  }
})

