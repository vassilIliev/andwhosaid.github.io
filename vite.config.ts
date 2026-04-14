import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the site at https://<user>.github.io/andWhoSaid/
// so all asset URLs must be prefixed with /andWhoSaid/.
export default defineConfig({
  base: '/andWhoSaid/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
});
