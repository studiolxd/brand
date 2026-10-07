import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * `SOLO_CLARO` y la etiqueta `solo-claro` van juntas (D43).
 *
 * `SOLO_CLARO` apaga el modo `oscuro` de Chromatic; la etiqueta saca la story
 * del proyecto de Vitest `storybook-dark`, que audita el catálogo en oscuro
 * (`vite.config.ts`). Son dos sitios porque el filtro del runner solo mira
 * etiquetas, y las etiquetas de CSF tienen que ser literales: no se pueden
 * derivar del parámetro. Si una story llevase `SOLO_CLARO` sin la etiqueta, el
 * proyecto oscuro auditaría un render (el correo, la tarjeta social) que nunca
 * va a existir; al revés, una etiqueta sin `SOLO_CLARO` dejaría sin auditar en
 * oscuro algo que Chromatic sí fotografía en oscuro.
 */
const srcDir = fileURLToPath(new URL('../..', import.meta.url));

function storyFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return storyFiles(path);
    return name.endsWith('.stories.tsx') ? [path] : [];
  });
}

describe('SOLO_CLARO ↔ etiqueta solo-claro', () => {
  it('cada chromatic: SOLO_CLARO lleva su etiqueta solo-claro, y al revés', () => {
    const files = storyFiles(join(srcDir, 'stories'));
    expect(files.length).toBeGreaterThan(0);
    const descuadres = files.flatMap((file) => {
      const source = readFileSync(file, 'utf8');
      const params = (source.match(/chromatic:\s*SOLO_CLARO\b/g) ?? []).length;
      const tags = (source.match(/tags:\s*\[[^\]]*'solo-claro'[^\]]*\]/g) ?? []).length;
      return params === tags ? [] : [`${relative(srcDir, file)}: ${params} SOLO_CLARO, ${tags} etiquetas`];
    });
    expect(descuadres).toEqual([]);
  });
});
