import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import {
  BRAND_ICON_ASSETS,
  BRAND_ICON_COLOR,
  BRAND_SOURCE_ASSETS,
} from './brand-assets';

// El script vive en scripts/ (fuera de src/), pero es el único sitio con los
// proyectos Vitest `unit`/`components` (src/**/*.test.ts); se importa por
// ruta relativa, como cualquier otro módulo.
type BuildIcons = typeof import('../../scripts/build-icons.mjs');
let buildIcons: BuildIcons['buildIcons'];
let composeIconSvg: BuildIcons['composeIconSvg'];
let packIco: BuildIcons['packIco'];
let BRAND_ICON_BG: BuildIcons['BRAND_ICON_BG'];

beforeAll(async () => {
  const mod = await import('../../scripts/build-icons.mjs');
  buildIcons = mod.buildIcons;
  composeIconSvg = mod.composeIconSvg;
  packIco = mod.packIco;
  BRAND_ICON_BG = mod.BRAND_ICON_BG;
});

const pngDimensions = (buf: Buffer) => ({
  width: buf.readUInt32BE(16),
  height: buf.readUInt32BE(20),
});

describe('build-icons.mjs', () => {
  it('el violeta de fondo es el primitivo de paleta color.lavender, sin hex inventado', () => {
    expect(BRAND_ICON_BG.toLowerCase()).toBe(BRAND_ICON_COLOR.toLowerCase());
    expect(BRAND_ICON_BG.toLowerCase()).toBe('#baabff');
  });

  it('composeIconSvg pinta un fondo cuadrado del color de marca con el isotipo en blanco', () => {
    const svg = composeIconSvg('src/assets/logomark-safe.svg', { side: 100, marginRatio: 0 });
    expect(svg).toContain('viewBox="0 0 100 100"');
    expect(svg).toContain(`fill="${BRAND_ICON_BG}"`);
    expect(svg).toContain('fill="#FFFFFF"');
  });

  it('rechaza una fuente sin viewBox cuadrado', () => {
    expect(() => composeIconSvg('src/assets/hero.png')).toThrow();
  });

  it('packIco produce un ICO válido con un directorio de N entradas', () => {
    const png = Buffer.alloc(29 + 4);
    // Cabecera IHDR mínima para un PNG "falso" de 16x16, suficiente para que
    // packIco (que solo lee ancho/alto de IHDR) no falle.
    png.writeUInt32BE(16, 16);
    png.writeUInt32BE(16, 20);
    const ico = packIco([png, png]);
    expect(ico.readUInt16LE(0)).toBe(0); // reserved
    expect(ico.readUInt16LE(2)).toBe(1); // type: icon
    expect(ico.readUInt16LE(4)).toBe(2); // count
  });

  describe('juego completo, en un directorio temporal', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'brand-icons-'));
    const outDir = join(tmp, 'icons');
    const favicon = join(tmp, 'favicon.svg');
    const brandDir = join(tmp, 'brand');

    it('genera los siete ficheros con las tallas del spec', async () => {
      const { files } = await buildIcons({ outDir, storybookFavicon: favicon, storybookBrandDir: brandDir });
      expect(files).toHaveLength(7);
      for (const f of files) expect(existsSync(f)).toBe(true);
      expect(existsSync(favicon)).toBe(true);

      const png192 = readFileSync(join(outDir, 'icon-192.png'));
      expect(pngDimensions(png192)).toEqual({ width: 192, height: 192 });

      const png512 = readFileSync(join(outDir, 'icon-512.png'));
      expect(pngDimensions(png512)).toEqual({ width: 512, height: 512 });

      const maskable = readFileSync(join(outDir, 'icon-512-maskable.png'));
      expect(pngDimensions(maskable)).toEqual({ width: 512, height: 512 });

      const apple = readFileSync(join(outDir, 'apple-touch-icon.png'));
      expect(pngDimensions(apple)).toEqual({ width: 180, height: 180 });

      const ico = readFileSync(join(outDir, 'favicon.ico'));
      expect(ico.readUInt16LE(2)).toBe(1);
      expect(ico.readUInt16LE(4)).toBe(3); // 16 + 32 + 48

      const manifest = JSON.parse(readFileSync(join(outDir, 'manifest.webmanifest'), 'utf-8'));
      expect(manifest.icons).toHaveLength(3);
      expect(manifest.icons.find((i: { purpose?: string }) => i.purpose === 'maskable')).toBeTruthy();
      expect(manifest.theme_color.toLowerCase()).toBe(BRAND_ICON_COLOR.toLowerCase());
      expect(manifest.background_color.toLowerCase()).toBe(BRAND_ICON_COLOR.toLowerCase());

      rmSync(tmp, { recursive: true, force: true });
    });
  });

  it('es determinista: dos ejecuciones producen los mismos bytes', async () => {
    const tmpA = mkdtempSync(join(tmpdir(), 'brand-icons-a-'));
    const tmpB = mkdtempSync(join(tmpdir(), 'brand-icons-b-'));
    await buildIcons({
      outDir: join(tmpA, 'icons'),
      storybookFavicon: join(tmpA, 'favicon.svg'),
      storybookBrandDir: join(tmpA, 'brand'),
    });
    await buildIcons({
      outDir: join(tmpB, 'icons'),
      storybookFavicon: join(tmpB, 'favicon.svg'),
      storybookBrandDir: join(tmpB, 'brand'),
    });
    for (const file of ['icon.svg', 'favicon.ico', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png', 'apple-touch-icon.png', 'manifest.webmanifest']) {
      const a = readFileSync(join(tmpA, 'icons', file));
      const b = readFileSync(join(tmpB, 'icons', file));
      expect(a.equals(b)).toBe(true);
    }
    rmSync(tmpA, { recursive: true, force: true });
    rmSync(tmpB, { recursive: true, force: true });
  });

  it('BRAND_ICON_ASSETS y BRAND_SOURCE_ASSETS describen exactamente los ficheros que genera/publica el sistema', () => {
    const generated = ['icon.svg', 'favicon.ico', 'icon-192.png', 'icon-512.png', 'icon-512-maskable.png', 'apple-touch-icon.png', 'manifest.webmanifest'];
    expect(BRAND_ICON_ASSETS.map((a) => a.path.split('/').pop())).toEqual(generated);
    expect(BRAND_SOURCE_ASSETS.map((a) => a.path)).toEqual([
      'assets/logo.svg',
      'assets/logomark.svg',
      'assets/logomark-safe.svg',
    ]);
    for (const asset of BRAND_SOURCE_ASSETS) {
      expect(existsSync(`src/${asset.path}`)).toBe(true);
    }
  });
});
