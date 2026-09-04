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
        // Peers con contexto/estado compartido: SIEMPRE externos — bundlearlos
        // duplica la librería y el contexto no cruza al consumidor.
        'react-hook-form',
        'sonner',
        // El motor del correo: peer OPCIONAL, así que jamás bundleado. Solo lo
        // resuelve quien importe `@studiolxd/brand/email`.
        'react-email',
        /^@react-email\//,
        // El motor de conducta: externo. Empaquetado arrastra un shim CJS de
        // `require` (Turbopack lo rechaza en dev) y duplicaría su contexto.
        '@base-ui/react',
        /^@base-ui\/react\//,
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
