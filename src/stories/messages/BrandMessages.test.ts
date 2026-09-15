import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { entryPoints } from '../../../scripts/entry-points.mjs';

/**
 * El fixture de textos del Storybook **no puede viajar en el paquete**.
 *
 * Es la única objeción capaz de tumbar la campaña: si el catálogo castellano
 * que usa el Storybook acabara publicado —o si algún componente lo importara—
 * habríamos cambiado un default por otro, y seguiría habiendo un camino de
 * ejecución que cae en castellano dentro de una app en francés. Estos tests
 * son la garantía, no el comentario que lo promete.
 */

const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));

function ficherosDe(dir: string, ext: string[]): string[] {
  const salida: string[] = [];
  for (const entrada of readdirSync(dir)) {
    if (entrada === 'node_modules' || entrada === 'dist') continue;
    const ruta = join(dir, entrada);
    if (statSync(ruta).isDirectory()) salida.push(...ficherosDe(ruta, ext));
    else if (ext.some((e) => entrada.endsWith(e))) salida.push(ruta);
  }
  return salida;
}

describe('el fixture de textos se queda fuera del paquete', () => {
  it('ningún fichero de src/ importa el fixture ni nada de .storybook/', () => {
    const culpables = ficherosDe(join(repoRoot, 'src'), ['.ts', '.tsx'])
      // Los tests y las stories tampoco viajan en el paquete; lo que se vigila
      // aquí es el código que sí se compila a `dist/`.
      .filter((ruta) => !/\.(test|stories)\.tsx?$/.test(ruta))
      .filter((ruta) => {
        const código = readFileSync(ruta, 'utf8');
        return /from\s+['"][^'"]*\.storybook\//.test(código)
          || /brandMessagesFixture/.test(código.replace(/`[^`]*`|\/\*[\s\S]*?\*\/|\/\/.*/g, ''));
      })
      .map((ruta) => relative(repoRoot, ruta));

    expect(culpables).toEqual([]);
  });

  it('ningún punto de entrada de la librería sale de src/', () => {
    const fuera = Object.entries(entryPoints as Record<string, string>)
      .filter(([, ruta]) => !ruta.startsWith('src/'));

    expect(fuera).toEqual([]);
  });

  it('package.json#files no publica .storybook/', () => {
    const pkg = JSON.parse(readFileSync(join(repoRoot, 'package.json'), 'utf8'));
    expect(pkg.files).not.toContain('.storybook');
    for (const entrada of pkg.files as string[]) {
      expect(entrada.startsWith('.storybook')).toBe(false);
    }
  });
});

describe('Pagination no trae textos puestos', () => {
  const fuente = readFileSync(
    join(repoRoot, 'src/stories/molecules/Pagination/Pagination.tsx'),
    'utf8',
  );
  // Solo el cuerpo: el JSDoc de las props nombra los textos para explicarlos.
  const código = fuente.replace(/\/\*\*[\s\S]*?\*\//g, '');

  it.each([
    'Paginación',
    'Páginas',
    'Página anterior',
    'Página siguiente',
    'Registros por página',
    'resultados',
    'Todos',
  ])('no queda ningún «%s» cableado', (texto) => {
    expect(código).not.toContain(texto);
  });
});
