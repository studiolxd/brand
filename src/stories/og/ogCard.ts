/*
 * LA TARJETA SOCIAL DE MARCA — el árbol que pinta satori.
 *
 * Es la imagen que se ve cuando alguien pega un enlace de la suite en Slack,
 * WhatsApp, LinkedIn o X: 1200×630 px de píxeles planos. La pinta satori (el
 * motor que hay debajo de `ImageResponse` de `next/og`), y de ahí salen todas
 * las rarezas de este fichero:
 *
 * - **Todo estilo va en línea y resuelto.** Satori no carga hojas de estilo ni
 *   resuelve `var()`: recibe un árbol de elementos con un objeto `style` por
 *   nodo y nada más. Es la misma situación del correo y la misma excepción
 *   declarada a la regla de «sin `style`»: aquí no hay CSS que pueda ganar.
 *   Los valores salen todos de `tokens.ts` —el mismo sitio del que sale el
 *   `:root`— así que la tarjeta no puede irse del sistema sin que se vea.
 *
 * - **Propiedades físicas, no ejes lógicos.** Satori implementa un subconjunto
 *   de flexbox sobre Yoga y no conoce `padding-inline` ni `margin-block`: un
 *   eje lógico se ignora en silencio y la tarjeta sale sin márgenes. Igual que
 *   en `src/stories/email/`, y por el mismo motivo: el medio no es un navegador.
 *
 * - **Nada de CSS ni de DOM.** El módulo corre en el servidor, así que solo
 *   depende de `react` (para el árbol) y de los tokens (para los valores).
 *
 * - **`display: flex` explícito en cada nodo.** Satori solo entiende flex, y el
 *   catálogo pinta este mismo árbol como HTML: declararlo en todos los nodos es
 *   lo que hace que las dos superficies dibujen lo mismo.
 *
 * Las medidas del lienzo (1200×630) son del medio, no de la retícula: es lo que
 * pide Open Graph. Como los 600 px de ancho del correo, no salen de un token.
 */
import { createElement, type ReactElement } from 'react';

import { logomarkPaths, logomarkViewBox } from '../atoms/Logomark/logomarkAssets';
import { token, tokenPx } from '../../tokens/tokens';

import { OG_FONT_FAMILY } from './ogTypeface';

/** El tamaño que pide Open Graph, listo para pasárselo a `ImageResponse`. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** El tipo de contenido que devuelve `ImageResponse`, para la cabecera de la ruta. */
export const OG_CONTENT_TYPE = 'image/png';

export interface OgCardProps {
  /** El título de la página. Es lo único grande de la tarjeta. */
  title: string;
  /** Una línea de apoyo bajo el título. Opcional. */
  subtitle?: string;
  /** Una etiqueta corta arriba a la derecha: sección, categoría, fecha. Opcional. */
  eyebrow?: string;
  /** El nombre de la aplicación, junto al isotipo. */
  appName: string;
}

/*
 * La tarjeta lee a la talla PÚBLICA, como el correo y por lo mismo: es parte
 * pública de la suite, no interfaz de aplicación. El remapeo de la superficie
 * pública se genera en CSS y aquí no hay CSS, así que se apunta directamente a
 * los tokens fuente `--site-shell-*` en vez de a la escala de aplicación.
 */
const ink = token('--color-text-on-dark');
const inkMuted = token('--color-text-muted-on-dark');
const paper = token('--color-background-dark');
const brandBand = token('--color-accent-2');

const gutter = tokenPx('--spacing-8');
/* En números, no en `px`: los atributos `width`/`height` de un `<svg>` no son
   estilo, y satori los quiere como medida cruda. */
const markSize = Number.parseFloat(tokenPx('--logomark-size-xl'));

const weightDefault = Number(token('--font-weight-default'));
const weightEmphasis = Number(token('--font-weight-emphasis'));

/**
 * El árbol de la tarjeta social de marca, listo para satori.
 *
 * ```ts
 * new ImageResponse(ogCard({ title, appName: 'Bricks' }), {
 *   ...OG_SIZE,
 *   fonts: await ogFonts(),
 * });
 * ```
 */
export function ogCard({ title, subtitle, eyebrow, appName }: OgCardProps): ReactElement {
  const marca = createElement(
    'div',
    { key: 'marca', style: { display: 'flex', alignItems: 'center', gap: tokenPx('--spacing-4') } },
    createElement(
      'svg',
      {
        key: 'isotipo',
        width: markSize,
        height: markSize,
        viewBox: logomarkViewBox,
        fill: ink,
      },
      logomarkPaths.map((d, i) => createElement('path', { key: i, d })),
    ),
    createElement(
      'div',
      {
        key: 'nombre',
        style: {
          display: 'flex',
          fontSize: tokenPx('--site-shell-heading-size-5'),
          fontWeight: weightEmphasis,
          color: ink,
        },
      },
      appName,
    ),
  );

  const cabecera = createElement(
    'div',
    {
      key: 'cabecera',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    },
    marca,
    eyebrow
      ? createElement(
          'div',
          {
            key: 'eyebrow',
            style: {
              display: 'flex',
              fontSize: tokenPx('--site-shell-heading-size-5'),
              fontWeight: weightDefault,
              color: inkMuted,
            },
          },
          eyebrow,
        )
      : null,
  );

  const cuerpo = createElement(
    'div',
    {
      key: 'cuerpo',
      style: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        gap: tokenPx('--spacing-5'),
      },
    },
    createElement(
      'div',
      {
        key: 'titulo',
        style: {
          display: 'flex',
          fontSize: tokenPx('--site-shell-heading-size-9'),
          fontWeight: weightEmphasis,
          lineHeight: Number(token('--line-height-tight')),
          color: ink,
        },
      },
      title,
    ),
    subtitle
      ? createElement(
          'div',
          {
            key: 'subtitulo',
            style: {
              display: 'flex',
              fontSize: tokenPx('--site-shell-heading-size-6'),
              fontWeight: weightDefault,
              lineHeight: Number(token('--line-height-snug')),
              color: inkMuted,
            },
          },
          subtitle,
        )
      : null,
  );

  /* La franja de marca va a sangre, así que cuelga del lienzo y no del texto:
     es el único nodo que se queda fuera del margen. */
  const franja = createElement('div', {
    key: 'franja',
    style: {
      display: 'flex',
      height: tokenPx('--spacing-3'),
      backgroundColor: brandBand,
    },
  });

  const contenido = createElement(
    'div',
    {
      key: 'contenido',
      style: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        paddingTop: gutter,
        paddingBottom: gutter,
        paddingLeft: gutter,
        paddingRight: gutter,
      },
    },
    cabecera,
    cuerpo,
  );

  return createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'column',
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        backgroundColor: paper,
        color: ink,
        fontFamily: OG_FONT_FAMILY,
      },
    },
    contenido,
    franja,
  );
}
