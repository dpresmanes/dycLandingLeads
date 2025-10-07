import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Detect environment to avoid proxy loop when running under `vercel dev`
const DEV_PORT: number = 5173
const isVercelDev = process.env.VERCEL === '1'
const vercelPort = Number(process.env.VERCEL_PORT || 3000)
const vercelDevTarget = process.env.VERCEL_DEV_URL || `http://localhost:${vercelPort}`

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src')
    }
  },
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
    host: true,
    port: DEV_PORT,
    strictPort: false,
    hmr: isVercelDev ? {} : undefined,
    // Enable proxy only when running under `vercel dev` to reach its server
    proxy: isVercelDev
      ? {
          '/api': {
            target: vercelDevTarget,
            changeOrigin: true,
            secure: false,
          },
        }
      : undefined,
  },
  define: {
    global: 'globalThis',
  },
})
