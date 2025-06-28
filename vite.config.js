import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/zuclothing/', // Required for GitHub Pages subpath
  server: {
    port: 5173, // Custom dev server port
    open: true // Auto-open browser
  },
  build: {
    outDir: 'dist', // Output directory
    emptyOutDir: true, // Clear output directory before build
    sourcemap: true // Generate source maps
  }
});