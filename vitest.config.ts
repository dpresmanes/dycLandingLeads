import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        'dist/'
      ],
      thresholds: {
        lines: 15,
        functions: 40,
        statements: 15,
        branches: 10
      },
      thresholdAutoUpdate: true
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src')
    }
  }
});