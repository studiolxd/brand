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

/** Los fixtures del Storybook, por nombre: hoy el castellano y el inglés. */
const fixtures = readdirSync(join(repoRoot, '.storybook'))
  .filter((entrada) => /^brandMessagesFixture.*\.ts$/.test(entrada))
  .map((entrada) => entrada.replace(/\.ts$/, ''));

describe('los fixtures de textos se quedan fuera del paquete', () => {
  it('hay más de uno, y el inglés está entre ellos', () => {
    // Si el inglés desapareciera, las stories de «otro idioma» volverían al
    // literal copiado en cada fichero, que es lo que este fixture evita.
    expect(fixtures).toContain('brandMessagesFixtureEn');
    expect(fixtures).toContain('brandMessagesFixture');
  });

  it('ningún fichero de src/ importa un fixture ni nada de .storybook/', () => {
    const culpables = ficherosDe(join(repoRoot, 'src'), ['.ts', '.tsx'])
      // Los tests y las stories tampoco viajan en el paquete; lo que se vigila
      // aquí es el código que sí se compila a `dist/`.
      .filter((ruta) => !/\.(test|stories)\.tsx?$/.test(ruta))
      .filter((ruta) => {
        const código = readFileSync(ruta, 'utf8');
        const cuerpo = código.replace(/`[^`]*`|\/\*[\s\S]*?\*\/|\/\/.*/g, '');
        return /from\s+['"][^'"]*\.storybook\//.test(código)
          // Uno por uno y no por prefijo: un fixture nuevo entra en la lista
          // solo por existir en `.storybook/`, sin tocar este test.
          || fixtures.some((nombre) => cuerpo.includes(nombre));
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

/**
 * Un componente migrado no puede traer su castellano puesto: si quedara, la
 * prop ausente caería en él en vez de llegar al proveedor, y una app en
 * francés pintaría «Acciones» sin que falle nada.
 *
 * Se mira **el cuerpo**, no el JSDoc: la doc de una prop nombra el texto para
 * explicarlo, y eso no es un camino de ejecución.
 */
describe.each([
  [
    'Pagination',
    'src/stories/molecules/Pagination/Pagination.tsx',
    [
      'Paginación',
      'Páginas',
      'Página anterior',
      'Página siguiente',
      'Registros por página',
      'resultados',
      'Todos',
    ],
  ],
  [
    'Table',
    'src/stories/molecules/Table/Table.tsx',
    ['Acciones', 'Activar ordenación', 'Ordenado ascendente', 'Ordenado descendente'],
  ],
  [
    'DataTable',
    'src/stories/organisms/DataTable/DataTable.tsx',
    ['Sin resultados', 'Buscar', 'Borrar'],
  ],
  [
    'InputField',
    'src/stories/molecules/InputField/InputField.tsx',
    ['Borrar'],
  ],
  [
    'PasswordField',
    'src/stories/molecules/PasswordField/PasswordField.tsx',
    ['Mostrar contraseña', 'Ocultar contraseña'],
  ],
  [
    'Select',
    'src/stories/atoms/Select/Select.tsx',
    ['Seleccionar…'],
  ],
  [
    'MultiSelect',
    'src/stories/atoms/MultiSelect/MultiSelect.tsx',
    ['Seleccionar…', 'Quitar '],
  ],
])('%s no trae textos puestos', (_componente, ruta, textos) => {
  const fuente = readFileSync(join(repoRoot, ruta), 'utf8');
  // Solo el cuerpo: el JSDoc de las props nombra los textos para explicarlos.
  const código = fuente.replace(/\/\*\*[\s\S]*?\*\//g, '');

  it.each(textos)('no queda ningún «%s» cableado', (texto) => {
    expect(código).not.toContain(texto);
  });
});
