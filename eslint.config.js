// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([globalIgnores(['dist', 'storybook-static', 'coverage', '.worktrees']), {
  files: ['**/*.{ts,tsx}'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
}, {
  // Ningún componente del catálogo emite un atributo `style` en su HTML.
  //
  // Una app servida con `style-src 'self'` —sin `style-src-attr
  // 'unsafe-inline'`— descarta en silencio, SIN violación en consola, todo
  // atributo `style` del HTML (y también `setAttribute('style', …)`). Un
  // componente que fía a ese atributo una columna, una medida o un color se
  // rompe ahí sin dejar rastro. Lo que la CSP no bloquea es el CSSOM
  // (`el.style.setProperty(…)`, que es lo que hace `useCssProperties`) ni los
  // atributos de presentación de SVG (`fill`, `stroke`, `width`, `d`…).
  //
  // Por orden de preferencia: un `data-*` con su regla en la hoja cuando el
  // valor es enumerable; un atributo de presentación cuando el elemento es
  // SVG; el CSSOM cuando lo que se pinta solo existe en cliente.
  //
  // Alcance: las fuentes de componente. Fuera quedan las stories, los tests y
  // Foundations —no viajan en el paquete: son el catálogo, y ahí un `style`
  // de maqueta es legítimo— y las dos excepciones declaradas del repo, cuyo
  // medio no es un navegador con hoja de estilos:
  //   · `src/stories/email/**` — Outlook no resuelve `var()` ni admite hoja.
  //   · `src/stories/og/**`    — la imagen se rasteriza, no se sirve.
  files: ['src/stories/**/*.tsx'],
  ignores: [
    'src/stories/**/*.stories.tsx',
    'src/stories/**/*.test.tsx',
    'src/stories/email/**',
    'src/stories/og/**',
    'src/stories/foundations/**',
  ],
  rules: {
    'no-restricted-syntax': ['error', {
      selector: "JSXAttribute[name.name='style']",
      message: "Sin atributo `style`: una app con `style-src 'self'` lo descarta sin avisar. Usa un `data-*` con su regla en la hoja, un atributo de presentación de SVG, o `useCssProperties` si solo se pinta en cliente. Para conservar uno, `eslint-disable-next-line no-restricted-syntax` con el motivo.",
    }],
  },
}, ...storybook.configs["flat/recommended"]])
