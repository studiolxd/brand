import { useEffect } from 'react'
import MockDate from 'mockdate'
import type { Preview, Decorator } from '@storybook/react-vite'
import '../src/index.css'
import '../src/stylesheets/fonts.css'
import './preview.css'
import studiolxdTheme from './studiolxdTheme'
import { STORY_TODAY } from '../src/stories/utils/storyDate'
import { MODOS_CHROMATIC } from '../src/stories/utils/chromaticModes'
import { BrandMessagesProvider } from '../src/stories/messages/BrandMessagesProvider'
import { brandMessagesFixture } from './brandMessagesFixture'

/**
 * El catálogo vive siempre en la misma fecha. Sin esto, cualquier componente o
 * story que calcule sobre `new Date()` (el «hoy» de `Calendar`, el mes por
 * defecto de `CalendarPlanner`…) cambia de captura en Chromatic cada día —
 * pasó el 11 de septiembre de 2026 con la línea base del día anterior: el
 * marcador de «hoy» se había movido una casilla y Chromatic lo señaló como
 * cambio visual. `mockdate` sustituye el constructor global `Date` (y
 * `Date.now`), así que congela tanto el código de los componentes como el de
 * las stories sin tocar ninguno de los dos; se fija al cargar este módulo,
 * antes de que se monte cualquier story, y aplica igual en el navegador de
 * Storybook en local, en `pnpm test:stories` (Chromium vía
 * `@storybook/addon-vitest`) y en la captura de Chromatic — los tres son el
 * mismo entorno de navegador real, nunca jsdom. No usar `Date.now()`/`new
 * Date()` sin argumentos en una story para «hoy»: usar `STORY_TODAY`.
 */
MockDate.set(STORY_TODAY)

/**
 * Superficie oscura para una story. Se activa de dos formas:
 * - desde el global `backgrounds` (el switcher de fondos de Storybook, y el
 *   mismo que mueven los modos de Chromatic: cada story se fotografía en claro
 *   y en oscuro sin duplicarla en el catálogo);
 * - desde la propia story, con `parameters: { surface: 'dark' }`, para la que
 *   ENSEÑA ese uso porque el oscuro le cambia algo (una variante que invierte,
 *   un relleno autocontenido que NO cambia). Esa se acompaña de
 *   `chromatic: SOLO_OSCURO`: en el modo claro daría la misma captura.
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

/**
 * El catálogo de textos, para todas las stories. Los componentes ya no traen
 * el castellano puesto: lo leen del `BrandMessagesProvider`, así que el
 * Storybook —que es la aplicación que los monta— tiene que montarlo igual que
 * lo hará cada app de la suite.
 *
 * El fixture es castellano por comodidad, pero no reintroduce el default que
 * se quitó: vive en `.storybook/`, fuera del paquete publicado, y ningún
 * código de un consumidor lo alcanza (ver `brandMessagesFixture.ts` y el test
 * `src/stories/messages/BrandMessages.test.ts`). Una story que quiera enseñar otro
 * idioma envuelve su propio proveedor por encima de este.
 */
const withBrandMessages: Decorator = (Story) => (
  <BrandMessagesProvider messages={brandMessagesFixture}>
    <Story />
  </BrandMessagesProvider>
);

const preview: Preview = {
  decorators: [withSurface, withBrandMessages],
  initialGlobals: {
    // La clave de la opción, no el color: es lo que espera el addon de fondos
    // (y lo que mueven los modos de Chromatic).
    backgrounds: { value: 'light' },
  },
  parameters: {
    backgrounds: {
      options: {
        light: { name: 'Light',  value: '#ffffff' },
        dark:  { name: 'Dark', value: '#111e30' },
      },
    },
    // Cada story se captura en las dos superficies. El oscuro del catálogo son
    // estos modos, no stories duplicadas (ver `src/stories/utils/chromaticModes.ts`).
    chromatic: { modes: MODOS_CHROMATIC },

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
          // Fundamentos de lo más visible a lo más estructural: primero la marca
          // y sus piezas (el logotipo, la tarjeta social), luego lo que define el
          // aspecto (color, letra, aire), forma y profundidad, después
          // comportamiento, las reglas de composición y contenido, y al final
          // cómo se consumen los tokens fuera del CSS. Los que faltan por crear
          // van en su hueco cuando existan.
          'Foundations',
          [
            'Marca',
            'Tarjeta social',
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
            'Gráficos de datos',
            'Internacionalización',
            'Redacción',
            'Tokens desde JavaScript',
          ],
          'Atoms',
          'Molecules',
          'Organisms',
          'Sections',
          'Templates',
          'Pages',
          'Email',
          'Por revisar',
        ],
      },
    },

    a11y: {
      // El addon de accesibilidad hace fallar `pnpm test:stories` (D16): axe
      // corre al acabar cada story —tras su `play`— y una violación es un test
      // rojo. Una regla solo se desactiva en la story concreta, nunca aquí ni
      // la a11y entera, con `parameters: { a11y: { config: { rules: [{ id,
      // enabled: false }] } } }` y un comentario encima que diga si es una
      // decisión pendiente del operador (contraste: no se inventan colores) o
      // un falso positivo, y por qué. El runner solo pasa en claro: el oscuro
      // de cada story (modo `oscuro` de Chromatic) no lo audita.
      test: 'error',
    }
  },
};

export default preview;
