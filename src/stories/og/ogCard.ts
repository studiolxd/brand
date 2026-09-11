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

import { logoPaths, logoViewBox } from '../atoms/Logo/logoAssets';
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
}

/*
 * La tarjeta lee a la talla PÚBLICA, como el correo y por lo mismo: es parte
 * pública de la suite, no interfaz de aplicación. El remapeo de la superficie
 * pública se genera en CSS y aquí no hay CSS, así que se apunta directamente a
 * los tokens fuente `--site-shell-*` en vez de a la escala de aplicación.
 */
const ink = token('--color-primary');
const paper = token('--color-accent-1');

const gutter = tokenPx('--spacing-8');

/* En números, no en `px`: los atributos `width`/`height` de un `<svg>` no son
   estilo, y satori los quiere como medida cruda. El ancho sale del propio
   `viewBox`, para no cablear una proporción que es del trazado. */
const [, , logoWidthRatio, logoHeightRatio] = logoViewBox.split(' ').map(Number);
/* El doble de la talla mayor de interfaz: el lienzo es 1200 px, casi el doble de
   un ancho de lectura, y la tarjeta se mira reducida en un hilo — a la talla de
   una cabecera la firma no se lee. El factor es del medio, como los 1200×630. */
const logoHeight = 2 * Number.parseFloat(tokenPx('--logo-height-xl'));
const logoWidth = Math.round((logoHeight * logoWidthRatio) / logoHeightRatio);

const weightDefault = Number(token('--font-weight-default'));
const weightEmphasis = Number(token('--font-weight-emphasis'));

/**
 * El árbol de la tarjeta social de marca, listo para satori.
 *
 * ```ts
 * new ImageResponse(ogCard({ title }), {
 *   ...OG_SIZE,
 *   fonts: await ogFonts(),
 * });
 * ```
 */
export function ogCard({ title, subtitle, eyebrow }: OgCardProps): ReactElement {
  /* El logotipo firma arriba a la derecha, así que va en su propia fila: un
     `alignSelf` no vale porque satori solo implementa un subconjunto de flex. */
  const firma = createElement(
    'div',
    {
      key: 'firma',
      /* `flex-start` en el eje cruzado: sin él la fila estira el `<svg>` a lo
         alto y el trazado, que conserva su proporción, se sale por la derecha. */
      style: { display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start' },
    },
    createElement('svg', {
      key: 'marca',
      width: logoWidth,
      height: logoHeight,
      viewBox: logoViewBox,
      fill: ink,
      children: logoPaths.map((d, i) => createElement('path', { key: i, d })),
    }),
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
    /* El eyebrow se pega al título y el aire grande queda solo antes del
       subtítulo: es la proximidad del eyebrow de `PrevNextNav`, lo que hace que
       se lea como antetítulo y no como una línea suelta. El énfasis lo lleva por
       peso, que es como el sistema separa jerarquías sin cambiar de tinta. */
    createElement(
      'div',
      {
        key: 'titular',
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: tokenPx('--spacing-2'),
        },
      },
      eyebrow
        ? createElement(
            'div',
            {
              key: 'eyebrow',
              style: {
                display: 'flex',
                fontSize: tokenPx('--site-shell-heading-size-6'),
                fontWeight: weightEmphasis,
                color: ink,
              },
            },
            eyebrow,
          )
        : null,
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
    ),
    subtitle
      ? createElement(
          'div',
          {
            key: 'subtitulo',
            style: {
              display: 'flex',
              fontSize: tokenPx('--site-shell-heading-size-7'),
              fontWeight: weightDefault,
              lineHeight: Number(token('--line-height-snug')),
              color: ink,
            },
          },
          subtitle,
        )
      : null,
  );

  /* El margen va en un nodo interior, no en el lienzo: el lienzo lleva un ancho
     fijo y satori lo mide como `border-box`, pero el navegador del catálogo no
     —sumaría el padding y se saldría el logotipo—. Así dibujan lo mismo. */
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
    firma,
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
  );
}
