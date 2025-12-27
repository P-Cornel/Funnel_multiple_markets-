
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'framer-motion', 'recharts'],
          utils: ['jspdf', 'html2canvas', 'lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
