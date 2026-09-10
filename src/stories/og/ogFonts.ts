/*
 * LAS FUENTES DE LA TARJETA — las dos caras de marca, en el formato que pide satori.
 *
 * Satori no lee woff2, que es el formato en el que la web sirve la sans
 * (`fonts.css`): solo acepta TTF, OTF y WOFF. Y tampoco interpola ejes
 * variables —renderiza la instancia por defecto de la fuente—, así que cada
 * peso tiene que llegar ya instanciado. Por eso junto a los woff2 variables
 * viven dos TTF estáticos, bajados de la misma API de Google Fonts y con la
 * misma licencia OFL; la procedencia está en el README de esa carpeta.
 *
 * Los dos pesos son los del sistema, no los de imprenta: la marca escribe en
 * ligera (`--font-weight-default`, 300) y enfatiza en media
 * (`--font-weight-emphasis`, 500).
 *
 * Esto lee del disco, así que pide un sistema de ficheros: vale en Node —el
 * runtime por defecto de una ruta OG— y no en Edge. `ogCard()` sí es puro y
 * corre en cualquier sitio; quien necesite Edge trae los mismos ficheros por
 * `fetch` y arma el array a mano.
 */
import { token } from '../../tokens/tokens';

import { OG_FONT_FAMILY } from './ogTypeface';

/** Una cara, en la forma exacta que espera la opción `fonts` de satori. */
export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: 'normal';
}

const CARAS = [
  { weight: Number(token('--font-weight-default')), file: 'google-sans-flex-normal-300.ttf' },
  { weight: Number(token('--font-weight-emphasis')), file: 'google-sans-flex-normal-500.ttf' },
] as const;

/*
 * Las rutas se resuelven contra el módulo, no contra el directorio de trabajo:
 * esto corre desde `node_modules` de otra aplicación. Y el módulo vive en dos
 * sitios con distinta profundidad —`dist/og.js` en el paquete publicado,
 * `src/stories/og/ogFonts.ts` en el repo (tests y catálogo)—, así que se
 * prueban las dos y se usa la que exista.
 */
const CARPETAS = ['./assets/fonts/google-sans-flex/', '../../assets/fonts/google-sans-flex/'];

/** El `Buffer` de Node como `ArrayBuffer` suelto, que es lo que satori quiere. */
function arrayBuffer(buffer: Uint8Array): ArrayBuffer {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

/**
 * Las caras de marca para la opción `fonts` de `ImageResponse`/`satori`.
 *
 * ```ts
 * new ImageResponse(ogCard({ … }), { ...OG_SIZE, fonts: await ogFonts() });
 * ```
 */
export async function ogFonts(): Promise<OgFont[]> {
  /* Dinámico a propósito: así el grafo de `ogCard()` no arrastra `node:fs` y
     sigue siendo importable desde cualquier runtime. */
  const { readFile } = await import('node:fs/promises');

  return Promise.all(
    CARAS.map(async ({ weight, file }) => {
      let ultimo: unknown;
      for (const carpeta of CARPETAS) {
        try {
          const data = await readFile(new URL(carpeta + file, import.meta.url));
          return { name: OG_FONT_FAMILY, data: arrayBuffer(data), weight, style: 'normal' as const };
        } catch (error) {
          ultimo = error;
        }
      }
      throw new Error(`No se encontró la fuente ${file} junto al módulo`, { cause: ultimo });
    }),
  );
}
