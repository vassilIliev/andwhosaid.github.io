import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so assets work on GitHub Pages regardless of repo URL casing
// (e.g. /andwhosaid/ vs /andWhoSaid/) and for any project subpath.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
});
