/*
 * El visor de la tarjeta social del catálogo.
 *
 * La tarjeta se pinta con satori y sale como un PNG de 1200×630 px, que no cabe
 * en la página de Storybook. Pero su árbol es flex plano con estilos en línea,
 * o sea HTML corriente: el navegador lo dibuja igual que satori, así que aquí
 * se monta tal cual y se reduce con un `transform`. Lo que se ve es el árbol de
 * verdad, no una maqueta aparte que pudiera irse por su lado.
 *
 * No forma parte del paquete: vive aquí para poder mirar la tarjeta sin
 * publicar un enlace en Slack a ver qué sale. Sus estilos en línea son de
 * visor —el marco y la escala—, no de la tarjeta.
 */
import type { ReactElement } from 'react';

/* Del módulo de la tarjeta, no del barril: `ogFonts()` lee del disco y el
   catálogo corre en un navegador. */
import { OG_SIZE } from '../og/ogCard';

/** Cuánto se encoge el lienzo para caber en la página del catálogo. */
const ESCALA = 0.5;

export interface OgPreviewProps {
  /** El árbol que devuelve `ogCard()`. */
  children: ReactElement;
}

export function OgPreview({ children }: OgPreviewProps) {
  return (
    <div
      style={{
        width: OG_SIZE.width * ESCALA,
        height: OG_SIZE.height * ESCALA,
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <div style={{ transform: `scale(${ESCALA})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  );
}
