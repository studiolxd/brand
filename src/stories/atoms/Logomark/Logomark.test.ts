import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  logomarkPaths,
  logomarkSafeSvg,
  logomarkSafeViewBox,
  logomarkSvg,
  logomarkViewBox,
} from './index';

const leer = (nombre: string) => readFileSync(new URL(`../../../assets/${nombre}`, import.meta.url), 'utf8').trim();

describe('activos del isotipo', () => {
  it('logomarkSvg es el fichero src/assets/logomark.svg', () => {
    expect(logomarkSvg).toBe(leer('logomark.svg'));
  });

  it('logomarkSafeSvg es el fichero src/assets/logomark-safe.svg', () => {
    expect(logomarkSafeSvg).toBe(leer('logomark-safe.svg'));
  });

  it('los dos ficheros comparten los trazados y difieren solo en el viewBox', () => {
    for (const svg of [logomarkSvg, logomarkSafeSvg]) {
      const trazados = [...svg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
      expect(trazados).toEqual([...logomarkPaths]);
    }
    expect(logomarkSvg).toContain(`viewBox="${logomarkViewBox}"`);
    expect(logomarkSafeSvg).toContain(`viewBox="${logomarkSafeViewBox}"`);
  });

  it('los trazados salen del logotipo, sin redibujar', () => {
    const logo = readFileSync(new URL('../Logo/Logo.tsx', import.meta.url), 'utf8');
    const enLogo = [...logo.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1].replace(/\s+/g, ' ').trim());
    for (const d of logomarkPaths) expect(enLogo).toContain(d);
  });

  it('la tinta es currentColor, sin imágenes incrustadas', () => {
    for (const svg of [logomarkSvg, logomarkSafeSvg]) {
      expect(svg).toContain('fill="currentColor"');
      expect(svg).not.toContain('<image');
      expect(svg).not.toContain('base64');
    }
  });
});
