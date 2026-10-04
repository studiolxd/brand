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
 * compilar aunque no usara el logo. Un espacio nuevo que solo pide una
 * funcionalidad opcional tiene que ser opcional.
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
import type { BrandMessages, AppHeaderMessages } from './BrandMessages';
import { brandMessagesFixture } from '../../../.storybook/brandMessagesFixture';
const { appHeader: _quitado, ...sinAppHeader } = brandMessagesFixture;
void _quitado;
`;

describe('BrandMessages — appHeader es opcional', () => {
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

  it('el comprobador sí detecta un espacio obligatorio que falta (control)', () => {
    const errores = erroresDe(`${cabecera}
      const { siteHeader: _sinSiteHeader, ...incompleto } = sinAppHeader;
      void _sinSiteHeader;
      export const catalogo: BrandMessages = incompleto;
    `);
    expect(errores.join('\n')).toMatch(/siteHeader/);
  }, 60_000);
});
