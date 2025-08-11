export default defineConfig({
  plugins: [react()],
  base: '/cyber-clarity-hub/',        // must match your repo name
  server: {                           // local dev only
    port: 5173,
    proxy: { '/api': { target: 'http://localhost:8000', changeOrigin: true } }
  }
})
