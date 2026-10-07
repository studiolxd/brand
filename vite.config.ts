import { defineConfig } from 'vite';
import type { TestProjectInlineConfiguration } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

/**
 * Un proyecto de stories: cada story es un test en Chromium, con axe al final
 * (`a11y.test: 'error'` en `.storybook/preview.tsx`). Hay dos, uno por
 * superficie (D43): `storybook` en claro y `storybook-dark` en oscuro.
 */
function storybookProject(
  name: string,
  { exclude, initialGlobals }: { exclude: string[]; initialGlobals?: Record<string, unknown> },
): TestProjectInlineConfiguration {
  return {
    extends: true,
    plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook'),
        tags: { exclude },
        initialGlobals,
      }),
    ],
    test: {
      name,
      // Cada story es un test en un Chromium compartido por todos los ficheros en paralelo: con la máquina
      // cargada hasta una story sin `play` (Menu «Trigger de icono») pasaba de los 20 s y daba un falso rojo.
      testTimeout: 60000,
      hookTimeout: 60000,
      browser: {
        enabled: true,
        headless: true,
        provider: playwright({}),
        instances: [{ browser: 'chromium' }],
      },
    },
  };
}

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      // Lo que fuerza el oscuro por su cuenta (`SOLO_OSCURO`) corre en los dos
      // y da el mismo render: no se excluye del claro, porque costaría una
      // etiqueta más en cada una de esas stories para ahorrar unos segundos.
      storybookProject('storybook', { exclude: [] }),
      // D43: el mismo catálogo con la superficie oscura activa. Mueve el mismo
      // global que el switcher de fondos y el modo `oscuro` de Chromatic, así
      // que `withSurface` pone `data-theme="dark"` en el `<html>` (portales
      // incluidos) y axe audita cada story en oscuro. Fuera, lo que no tiene
      // superficie oscura (`SOLO_CLARO`: el correo, la tarjeta social).
      storybookProject('storybook-dark', {
        // La etiqueta acompaña a `chromatic: SOLO_CLARO` (lo vigila
        // `src/stories/utils/chromaticModes.test.ts`).
        exclude: ['solo-claro'],
        initialGlobals: { backgrounds: { value: 'dark' } },
      }),
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
        },
      },
      {
        plugins: [react()],
        test: {
          name: 'components',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./test/setup.ts'],
          include: ['src/**/*.test.tsx'],
          testTimeout: 20000,
        },
      },
    ]
  }
});