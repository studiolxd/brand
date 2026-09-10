import { describe, expect, it } from 'vitest';

import { token } from '../tokens/tokens';

import { OG_CONTENT_TYPE, OG_SIZE, ogCard } from './ogCard';
import { ogFonts } from './ogFonts';
import { OG_FONT_FAMILY } from './ogTypeface';

describe('ogCard', () => {
  it('pinta el árbol completo', () => {
    expect(
      ogCard({
        appName: 'Bricks',
        eyebrow: 'Documentación',
        title: 'Cómo montar una lección',
        subtitle: 'De la plantilla al alumno, en cinco pasos.',
      }),
    ).toMatchSnapshot();
  });

  it('sin subtítulo ni eyebrow deja fuera los dos nodos, no los pinta vacíos', () => {
    const arbol = JSON.stringify(ogCard({ appName: 'Bricks', title: 'Solo título' }));

    expect(arbol).not.toContain('"subtitulo"');
    expect(arbol).not.toContain('"eyebrow"');
  });

  it('lleva el lienzo, el tamaño y la fuente de marca', () => {
    const { props } = ogCard({ appName: 'Bricks', title: 'Solo título' });

    expect(props.style).toMatchObject({
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      backgroundColor: token('--color-background-dark'),
      fontFamily: OG_FONT_FAMILY,
    });
  });

  it('el tamaño y el tipo de contenido son los de Open Graph', () => {
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    expect(OG_CONTENT_TYPE).toBe('image/png');
  });
});

describe('ogFonts', () => {
  it('trae las dos caras del sistema con datos de verdad', async () => {
    const caras = await ogFonts();

    expect(caras).toHaveLength(2);
    expect(caras.map((cara) => cara.weight)).toEqual([
      Number(token('--font-weight-default')),
      Number(token('--font-weight-emphasis')),
    ]);

    for (const cara of caras) {
      expect(cara.name).toBe(OG_FONT_FAMILY);
      expect(cara.style).toBe('normal');
      expect(cara.data.byteLength).toBeGreaterThan(0);

      /* Satori no lee woff2: si algún día se cuela uno aquí, la tarjeta sale
         con la fuente de respaldo y nadie se entera. La firma lo delata. */
      const firma = new DataView(cara.data).getUint32(0);
      expect(firma, `${cara.weight} no es TrueType`).toBe(0x00010000);
    }
  });
});
