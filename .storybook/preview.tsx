import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/index.css'
import './preview.css'
import studiolxdTheme from './studiolxdTheme'

/**
 * Superficie oscura para una story. Se activa de dos formas:
 * - desde el switcher de fondos de Storybook (globals.backgrounds = 'dark'),
 *   para explorar cualquier story en oscuro sin duplicarla;
 * - desde la propia story, con `parameters: { surface: 'dark' }`, para una
 *   story que ENSEÑA ese uso en el catálogo («En superficie oscura»).
 * En ambos casos envuelve en `.surface-dark`: el lienzo del sistema (fondo y
 * color emparejados en base.css), el mismo que pinta `Container surface="dark"`.
 */
const withSurface: Decorator = (Story, context) => {
  const isDark = context.globals.backgrounds?.value === 'dark' || context.parameters.surface === 'dark';
  if (!isDark) return <Story />;
  return (
    <div className="surface-dark" style={{ minHeight: '100%' }}>
      <Story />
    </div>
  );
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
