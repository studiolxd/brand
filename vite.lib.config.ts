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
        // Builtins de Node: los usa `@studiolxd/brand/og` para leer las fuentes
        // del disco. Empaquetarlos no tendría sentido y rompería el build.
        /^node:/,
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
        // `[name]` en un chunk compartido sale del nombre del módulo fuente
        // (p. ej. `Logo.tsx` → `Logo`), no de la clave de `entryPoints`: en
        // minúscula para que coincida siempre con el asset CSS asociado
        // (`assetFileNames` abajo, que si el chunk solo tiene CSS también
        // hereda `[name]`) — de lo contrario un `import '../Logo.css'`
        // puede apuntar a un fichero que en disco se llama `logo.css`, cosa
        // que solo revienta en un filesystem sensible a mayúsculas (Linux).
        chunkFileNames: (chunkInfo) => `_shared/${chunkInfo.name.toLowerCase()}.js`,
        assetFileNames: (assetInfo) => (assetInfo.names[0] ?? 'asset').toLowerCase(),
      },
    },
    cssCodeSplit: true,
    outDir: 'dist',
    emptyOutDir: true,
  },
});
