import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { entryPoints } from './scripts/entry-points.mjs';

export default defineConfig({
  plugins: [react()],
  publicDir: false,
  build: {
    lib: {
      entry: entryPoints,
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        /^@radix-ui\//,
        /^embla-carousel/,
        'react-phone-number-input',
        /^react-phone-number-input\//,
        'libphonenumber-js',
        /^libphonenumber-js\//,
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '_shared/[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
});
