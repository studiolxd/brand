import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { emailLogo } from '../stories/email/emailTheme';
import { BRAND_EMAIL_ASSETS, EMAIL_FONT_FILENAME, EMAIL_LOGO_FILENAME } from './brand-assets';

/** Lado del PNG leído de su cabecera IHDR — sin dependencias para un dato de 8 bytes. */
function pngSize(file: string) {
  const buf = readFileSync(file);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

/**
 * El mínimo de bytes que `pngSize` necesita para leer un ancho/alto en las
 * mismas posiciones que la cabecera IHDR real (offsets 16 y 20): no hace
 * falta un PNG válido, solo un fichero que la guarda del build lea como si lo
 * fuera.
 */
function pngBuffer(width: number, height: number) {
  const buf = Buffer.alloc(24);
  buf.writeUInt32BE(width, 16);
  buf.writeUInt32BE(height, 20);
  return buf;
}

// El script vive en scripts/ (fuera de src/), igual que build-icons.mjs; se
// importa por ruta relativa, como cualquier otro módulo del proyecto `unit`.
type BuildEmailAssets = typeof import('../../scripts/build-email-assets.mjs');
let buildEmailAssets: BuildEmailAssets['buildEmailAssets'];

beforeAll(async () => {
  const mod = await import('../../scripts/build-email-assets.mjs');
  buildEmailAssets = mod.buildEmailAssets;
});

describe('build-email-assets.mjs', () => {
  it('genera el logotipo y la fuente en dist/assets/email Y en public/email — dos destinos, un origen', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'brand-email-assets-'));
    const distOutDir = join(tmp, 'dist-assets-email');
    const publicOutDir = join(tmp, 'public-email');

    const { files } = buildEmailAssets({ distOutDir, publicOutDir });
    expect(files).toHaveLength(4);
    for (const f of files) expect(existsSync(f)).toBe(true);

    expect(existsSync(join(distOutDir, EMAIL_LOGO_FILENAME))).toBe(true);
    expect(existsSync(join(distOutDir, EMAIL_FONT_FILENAME))).toBe(true);
    expect(existsSync(join(publicOutDir, EMAIL_LOGO_FILENAME))).toBe(true);
    expect(existsSync(join(publicOutDir, EMAIL_FONT_FILENAME))).toBe(true);

    rmSync(tmp, { recursive: true, force: true });
  });

  it('el logotipo es el completo, no el isotipo: rectangular, a 2x de lo que declara el <img>', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'brand-email-assets-'));
    const distOutDir = join(tmp, 'dist-assets-email');
    const publicOutDir = join(tmp, 'public-email');

    buildEmailAssets({ distOutDir, publicOutDir });

    /* La invariante que importa: el PNG y los `width`/`height` del `<img>` de
       `EmailLayout` salen del mismo sitio y no pueden separarse. */
    expect(pngSize(join(distOutDir, EMAIL_LOGO_FILENAME))).toEqual({
      width: emailLogo.width * 2,
      height: emailLogo.height * 2,
    });
    /* Y no es cuadrado: si volviera a serlo, alguien repuso el isotipo. */
    expect(emailLogo.width).toBeGreaterThan(emailLogo.height);

    rmSync(tmp, { recursive: true, force: true });
  });

  it('el nombre del PNG va versionado, y el v1 cuadrado ya no se genera', () => {
    expect(EMAIL_LOGO_FILENAME).toMatch(/^logo-v\d+\.png$/);
    expect(EMAIL_LOGO_FILENAME).not.toBe('logo-v1.png');
  });

  it('BRAND_EMAIL_ASSETS describe exactamente los ficheros que genera el sistema en dist/assets/email/', () => {
    expect(BRAND_EMAIL_ASSETS.map((a) => a.path)).toEqual([
      `assets/email/${EMAIL_LOGO_FILENAME}`,
      `assets/email/${EMAIL_FONT_FILENAME}`,
    ]);
  });

  it('falla si ya hay un PNG con ese nombre y OTRAS medidas, en vez de sobrescribirlo en silencio', () => {
    // El incidente que motivó esta guarda (2026-09-14, v38.5.0→v38.5.1): el
    // PNG del logotipo pasó de 256×96 a 626×202 conservando `logo-v2.png`, y
    // Gmail —que cachea por URL sin forma de forzar un refresco— sirvió la
    // versión vieja cacheada estirada a las medidas nuevas: deformada y
    // pixelada. El build tiene que negarse a repetirlo.
    const tmp = mkdtempSync(join(tmpdir(), 'brand-email-assets-'));
    const distOutDir = join(tmp, 'dist-assets-email');
    const publicOutDir = join(tmp, 'public-email');
    mkdirSync(distOutDir, { recursive: true });

    // Un PNG "ya publicado" con el mismo nombre pero otro tamaño (1×1, el
    // caso más simple: basta con que difiera de lo que el token actual va a
    // generar).
    writeFileSync(join(distOutDir, EMAIL_LOGO_FILENAME), pngBuffer(1, 1));

    expect(() => buildEmailAssets({ distOutDir, publicOutDir })).toThrow(/otras medidas/);

    rmSync(tmp, { recursive: true, force: true });
  });
});
