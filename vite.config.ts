import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Detect environment to avoid proxy loop when running under `vercel dev`
const DEV_PORT: number = 5173
const isVercelDev = process.env.VERCEL === '1' && DEV_PORT === 3000

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    sourcemap: false,
  },
  server: {
    // Removed strict CSP headers in dev to avoid blocking Vite HMR and @react-refresh
    cors: true,
    host: 'localhost',
    port: DEV_PORT,
    strictPort: true,
    hmr: isVercelDev ? {} : { clientPort: DEV_PORT },
    // Only enable proxy when running standalone Vite (5175) to reach vercel dev on 3000
    proxy: isVercelDev
      ? undefined
      : {
          '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            secure: false,
          },
        },
  },
  define: {
    global: 'globalThis',
  },
})
