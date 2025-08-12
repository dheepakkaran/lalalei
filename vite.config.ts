import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/lalalei/',
  build: {
    outDir: 'dist',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
