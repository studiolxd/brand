import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
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
});
