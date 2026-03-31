import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/index.ts', 'src/stories/**/*.tsx'],
      exclude: ['src/stories/**/*.stories.tsx'],
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
    }),
  ],
  publicDir: false,
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'StudioLXDBrand',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
      ],
    },
    cssCodeSplit: false,
    outDir: 'dist',
    emptyOutDir: true,
  },
});
