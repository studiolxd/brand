import { describe, it, expect } from 'vitest';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

/**
 * Test de tipos: compila con TypeScript, contra el `BrandMessages` real, un
 * catálogo como los de las apps — un literal pasado sin conversión — y mira
 * qué errores salen. Los `.test.ts` no pasan por `tsc -b`, así que la
 * comprobación se hace aquí, con el compilador.
 *
 * Por qué existe: v49.23.0 añadió `appHeader` como espacio **obligatorio** y
 * un catálogo tipado estricto (el de `public-shell` en slxd) dejaba de
 * compilar aunque no usara el logo. Desde D5 todo `BrandMessages` es
 * opcional —lo que falta sale en castellano—, y el modo estricto pasa a ser
 * `CompleteBrandMessages`, que la app usa con `satisfies`.
 */

const messagesDir = fileURLToPath(new URL('./', import.meta.url));

function erroresDe(codigo: string): string[] {
  const virtual = join(messagesDir, '__catalogo_virtual__.ts');
  const opciones: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ES2023,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    allowImportingTsExtensions: true,
    resolveJsonModule: true,
    lib: ['lib.es2023.d.ts', 'lib.dom.d.ts', 'lib.dom.iterable.d.ts'],
    // Sin `vite/client`: los imports de `.css` son de efecto lateral y el
    // compilador los deja pasar; lo que se mide aquí son los tipos de textos.
    types: [],
  };
  const host = ts.createCompilerHost(opciones);
  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (nombre, idioma, ...resto) =>
    nombre === virtual ? ts.createSourceFile(nombre, codigo, idioma) : getSourceFile(nombre, idioma, ...resto);
  const fileExists = host.fileExists.bind(host);
  host.fileExists = (nombre) => nombre === virtual || fileExists(nombre);
  const programa = ts.createProgram([virtual], opciones, host);
  return ts
    .getPreEmitDiagnostics(programa, programa.getSourceFile(virtual))
    .map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
}

// El catálogo completo del Storybook, menos lo que se prueba en cada caso.
const cabecera = `
import type { BrandMessages, CompleteBrandMessages, AppHeaderMessages } from './BrandMessages';
import { brandMessagesFixture } from '../../../.storybook/brandMessagesFixture';
import { brandMessagesFixtureEn } from '../../../.storybook/brandMessagesFixtureEn';
import { brandMessagesEs } from './brandMessagesEs';
const { appHeader: _quitado, ...sinAppHeader } = brandMessagesFixture;
void _quitado;
`;

describe('BrandMessages — todo opcional (D5)', () => {
  it('un catálogo SIN appHeader compila contra BrandMessages', () => {
    expect(erroresDe(`${cabecera}
      export const catalogo: BrandMessages = sinAppHeader;
    `)).toEqual([]);
  }, 60_000);

  it('un catálogo con appHeader vacío o con su logo también compila', () => {
    expect(erroresDe(`${cabecera}
      export const vacio: BrandMessages = { ...sinAppHeader, appHeader: {} };
      export const conLogo: BrandMessages = { ...sinAppHeader, appHeader: { logo: 'Homenize, ir al inicio' } };
      export const espacio: AppHeaderMessages = {};
    `)).toEqual([]);
  }, 60_000);

  it('un catálogo parcial —sin espacios, o con espacios a medias— es un BrandMessages válido', () => {
    expect(erroresDe(`${cabecera}
      export const vacio: BrandMessages = {};
      export const unEspacio: BrandMessages = { pagination: { label: 'Pagination' } };
      export const unaMascara: BrandMessages = { datePicker: { maskLetters: { day: 'jj' } } };
      const { siteHeader: _sinSiteHeader, ...sinSiteHeader } = sinAppHeader;
      void _sinSiteHeader;
      export const sinUnEspacio: BrandMessages = sinSiteHeader;
    `)).toEqual([]);
  }, 60_000);

  it('opcional no es abierto: una clave que no existe sigue sin compilar', () => {
    const errores = erroresDe(`${cabecera}
      export const catalogo = { pagination: { lable: 'Pagination' } } satisfies BrandMessages;
    `);
    expect(errores.join('\n')).toMatch(/lable/);
  }, 60_000);
});

describe('CompleteBrandMessages — el modo estricto', () => {
  it('el respaldo del paquete y los dos fixtures del Storybook están enteros', () => {
    // Es la red para que el propio DS no se deje claves: un texto nuevo sin
    // su castellano o sin su inglés no compila aquí.
    expect(erroresDe(`${cabecera}
      export const es = brandMessagesEs satisfies CompleteBrandMessages;
      export const fixture = brandMessagesFixture satisfies CompleteBrandMessages;
      export const en = brandMessagesFixtureEn satisfies CompleteBrandMessages;
    `)).toEqual([]);
  }, 60_000);

  it('un catálogo al que le falta una clave NO lo satisface', () => {
    const errores = erroresDe(`${cabecera}
      const { label: _sinLabel, ...pagination } = brandMessagesFixture.pagination;
      void _sinLabel;
      export const catalogo = { ...brandMessagesFixture, pagination } satisfies CompleteBrandMessages;
    `);
    expect(errores.join('\n')).toMatch(/label/);
  }, 60_000);

  it('un catálogo al que le falta un espacio —aunque sea appHeader— NO lo satisface', () => {
    const errores = erroresDe(`${cabecera}
      export const catalogo = sinAppHeader satisfies CompleteBrandMessages;
    `);
    expect(errores.join('\n')).toMatch(/appHeader/);
  }, 60_000);

  it('las claves que en su espacio son opcionales (planningGrid.saving) también se exigen', () => {
    const errores = erroresDe(`${cabecera}
      const { saving: _sinSaving, ...planningGrid } = brandMessagesFixture.planningGrid;
      void _sinSaving;
      export const catalogo = { ...brandMessagesFixture, planningGrid } satisfies CompleteBrandMessages;
    `);
    expect(errores.join('\n')).toMatch(/saving/);
  }, 60_000);

  it('y un CompleteBrandMessages se acepta donde se pide un BrandMessages', () => {
    expect(erroresDe(`${cabecera}
      export const catalogo: BrandMessages = brandMessagesFixtureEn;
    `)).toEqual([]);
  }, 60_000);
});
