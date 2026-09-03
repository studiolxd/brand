import { useEffect } from 'react'
import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/index.css'
import '../src/stylesheets/fonts.css'
import './preview.css'
import studiolxdTheme from './studiolxdTheme'

/**
 * Superficie oscura para una story. Se activa de dos formas:
 * - desde el switcher de fondos de Storybook (globals.backgrounds = 'dark'),
 *   para explorar cualquier story en oscuro sin duplicarla;
 * - desde la propia story, con `parameters: { surface: 'dark' }`, para una
 *   story que ENSEÑA ese uso en el catálogo («En superficie oscura»).
 * En vez de envolver en `.surface-dark` (que no llega a los portales — Popover,
 * Menu, Tooltip, Modal, Select renderizan fuera del árbol de la story, en
 * `document.body`), pone `data-theme="dark"` en `document.documentElement`:
 * las custom properties remapeadas por surface-dark-* cascadean por herencia
 * a cualquier descendiente del `<html>`, portales incluidos. `body` ya pinta
 * su propio fondo/color desde esos tokens (`base.css`), así que el lienzo del
 * canvas queda coherente sin envolver en un div aparte.
 *
 * Excepción: en la **página de docs** conviven todas las stories del
 * componente, así que teñir el `<html>` desde ahí oscurecería a todas (y
 * dejaría ilegibles las que no piden oscuro). Ahí el lienzo se acota a un
 * contenedor `.surface-dark` por story en vez de tocar el `<html>` —
 * necesario además porque el bloque de cada story embebida en Docs vive
 * dentro de `.sbdocs-preview`, un contenedor propio del addon de docs de
 * Storybook con fondo blanco fijo (parte de su tema, no de nuestros tokens):
 * aunque el `<html>` se tiña, ese fondo blanco intermedio lo tapa. `.surface-dark`
 * sí lo resuelve porque pinta su propio fondo, con más especificidad que el
 * contenedor blanco que lo envuelve. Aplica lo mismo venga el oscuro del
 * switcher de fondos o de `parameters.surface` — ambos casos comparten
 * `context.viewMode === 'docs'` como condición de acotado.
 */
const withSurface: Decorator = (Story, context) => {
  const fromBackground = context.globals.backgrounds?.value === 'dark';
  const fromParameter = context.parameters.surface === 'dark';
  const wantsDark = fromBackground || fromParameter;
  const scoped = wantsDark && context.viewMode === 'docs';
  const isDark = wantsDark && !scoped;

  // eslint-disable-next-line react-hooks/rules-of-hooks -- decorator de Storybook, no un componente: se invoca como parte del render de cada story y puede usar hooks con seguridad.
  useEffect(() => {
    if (!isDark) return;
    document.documentElement.setAttribute('data-theme', 'dark');
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [isDark]);

  if (scoped) {
    return (
      <div className="surface-dark">
        <Story />
      </div>
    );
  }

  return <Story />;
};

const preview: Preview = {
  decorators: [withSurface],
  initialGlobals: {
    backgrounds: { value: '#ffffff' },
  },
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'Light',  value: '#ffffff' },
        dark:  { name: 'Dark', value: '#111e30' },
      },
    },
    docs: {
      theme: studiolxdTheme,
      toc: {
        headingSelector: 'h2, h3',
        ignoreSelector: '#primary',
        title: 'Contenido',
      },
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    options: {
      storySort: {
        // Lo revisado arriba; 'Por revisar' al final, como cola de trabajo que
        // debe menguar: cada componente rehecho sale de ahí y sube a su sitio.
        order: [
          // Fundamentos de lo más visible a lo más estructural: primero lo que
          // define el aspecto (color, letra, aire), luego forma y profundidad,
          // después comportamiento, y al final las reglas de composición y
          // contenido. Los que faltan por crear van en su hueco cuando existan.
          'Foundations',
          [
            'Colores',
            'Tipografía',
            'Espaciado',
            'Tallas de componente',
            'Bordes',
            'Radio de borde',
            'Sombras',
            'Opacidad',
            'Movimiento',
            'Puntos de ruptura',
            'Capas',
            'Iconografía',
            'Internacionalización',
          ],
          'Atoms',
          'Molecules',
          'Organisms',
          'Sections',
          'Templates',
          'Pages',
          'Por revisar',
        ],
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;
