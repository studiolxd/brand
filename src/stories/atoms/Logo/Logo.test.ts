import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { logoPaths, logoSvg, logoViewBox } from './logoAssets';

const leer = (nombre: string) => readFileSync(new URL(`../../../assets/${nombre}`, import.meta.url), 'utf8');

describe('activos del logotipo', () => {
  it('logoSvg es el fichero src/assets/logo.svg', () => {
    expect(logoSvg).toBe(leer('logo.svg'));
  });

  it('el SVG declara el viewBox y los trazados de logoPaths', () => {
    const trazados = [...logoSvg.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
    expect(trazados).toEqual([...logoPaths]);
    expect(logoSvg).toContain(`viewBox="${logoViewBox}"`);
  });

  it('la tinta es currentColor, sin imágenes incrustadas', () => {
    expect(logoSvg).toContain('fill="currentColor"');
    expect(logoSvg).not.toContain('<image');
    expect(logoSvg).not.toContain('base64');
  });

  it('declara role="img" y <title> — es identificable fuera del componente React', () => {
    expect(logoSvg).toContain('role="img"');
    expect(logoSvg).toContain('<title>Studio LXD</title>');
  });
});
