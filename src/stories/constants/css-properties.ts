import { useMemo } from 'react';

type CssProperties = Record<string, string | undefined>;

/**
 * Escribe propiedades CSS sobre un elemento por el **CSSOM**, no por el
 * atributo `style`.
 *
 * Una app servida con `style-src 'self'` (sin `style-src-attr
 * 'unsafe-inline'`) descarta en silencio —sin violación en consola— todo
 * atributo `style` que venga en el HTML, y también `setAttribute('style', …)`.
 * Lo que NO bloquea es `el.style.setProperty(…)`, que es lo que hace este
 * `ref`.
 *
 * Por eso solo vale para lo que se pinta **en cliente**: un popup en portal,
 * una capa que aparece al interactuar, una medida que el propio navegador
 * calcula. Lo que se ve en el primer render del servidor no puede depender de
 * esto —llegaría con el valor por defecto de la hoja y saltaría al hidratar—:
 * ahí la respuesta es un `data-*` con su regla, o un atributo de presentación
 * de SVG.
 *
 * Los nombres van en la sintaxis CSS (`min-width`, `--toast-gap`), no en
 * camelCase. Un valor `undefined` retira la propiedad.
 */
export function useCssProperties(properties: CssProperties) {
  const key = JSON.stringify(properties);
  return useMemo(
    () => (element: HTMLElement | SVGElement | null) => {
      if (!element) return;
      const entries = Object.entries(JSON.parse(key) as CssProperties);
      for (const [name, value] of entries) {
        if (value === undefined || value === null) element.style.removeProperty(name);
        else element.style.setProperty(name, value);
      }
    },
    [key],
  );
}
