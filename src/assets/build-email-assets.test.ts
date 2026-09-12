import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import { BRAND_EMAIL_ASSETS, EMAIL_FONT_FILENAME, EMAIL_LOGO_FILENAME } from './brand-assets';

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

  it('BRAND_EMAIL_ASSETS describe exactamente los ficheros que genera el sistema en dist/assets/email/', () => {
    expect(BRAND_EMAIL_ASSETS.map((a) => a.path)).toEqual([
      `assets/email/${EMAIL_LOGO_FILENAME}`,
      `assets/email/${EMAIL_FONT_FILENAME}`,
    ]);
  });
});
