import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { entryPoints, clientComponents } from './entry-points.mjs';
import {
  findServerHookLeaks,
  isClientModule,
  parseFacade,
  rewriteFacadeImports,
} from './lib/client-boundary.mjs';

/**
 * Toda entrada de `dist/` que no es cliente tiene que poder importarse desde un
 * Server Component. En el grafo de servidor de React no existen
 * `createContext`, `useContext`, `useState`… (la API es la de
 * `react.react-server.js`), y basta con EVALUAR un módulo que los llame en su
 * nivel superior para que el build de Next muera: así se rompió `site-footer`
 * en la v51 (`(0, k.createContext) is not a function`), porque componía el
 * cuerpo de `LegalFooter` y este leía el catálogo de textos.
 *
 * Se mira el `dist/` committeado —el que se publica—, recorriendo los imports
 * desde cada entrada de servidor y parando en cada `'use client'`, que es la
 * frontera. Si falla: o el componente pasa a `clientComponents` (si nadie le
 * pasa funciones desde el servidor), o lo que lee el contexto se aparta a una
 * isla cliente (`LegalFooterNav`); y si el `dist/` está viejo, `pnpm build:all`.
 */
const dist = fileURLToPath(new URL('../dist', import.meta.url));

describe('frontera cliente en dist/', () => {
  it('ninguna entrada de servidor alcanza contexto, hooks de cliente ni Base UI sin cruzar un `use client`', () => {
    expect(findServerHookLeaks(dist, Object.keys(entryPoints))).toEqual([]);
  });

  it('toda entrada de `clientComponents` sale con `use client` en la primera línea', () => {
    const sinDirectiva = [...clientComponents].filter(
      (name) => !isClientModule(readFileSync(`${dist}/${name}.js`, 'utf-8')),
    );
    expect(sinDirectiva).toEqual([]);
  });

  it('`site-footer` y `legal-footer` son de servidor: su `renderLink` puede venir de un Server Component', () => {
    for (const name of ['site-footer', 'legal-footer']) {
      expect(isClientModule(readFileSync(`${dist}/${name}.js`, 'utf-8'))).toBe(false);
    }
  });
});

describe('rewriteFacadeImports', () => {
  const facade = `'use client';\nimport './typing-indicator.css';\nimport { t as e } from "./_shared/typingindicator.js";\nexport { e as TypingIndicator };\n`;

  it('reconoce una fachada cliente y su mapa de nombres', () => {
    expect(parseFacade(facade)).toEqual({
      chunk: './_shared/typingindicator.js',
      names: new Map([['t', 'TypingIndicator']]),
    });
    expect(parseFacade(facade.replace(`'use client';\n`, ''))).toBeNull();
  });

  it('un módulo de servidor pasa a importar por la fachada, desde la raíz y desde `_shared/`', () => {
    const files = new Map([
      ['typing-indicator.js', facade],
      ['_shared/typingindicator.js', 'export { a as t };\n'],
      ['assistant-message.js', 'import { t } from "./_shared/typingindicator.js";\n'],
      ['_shared/chat.js', 'import { t as x } from "./typingindicator.js";\n'],
    ]);
    expect(rewriteFacadeImports(files)).toEqual(
      new Map([
        ['assistant-message.js', 'import { TypingIndicator as t } from "./typing-indicator.js";\n'],
        ['_shared/chat.js', 'import { TypingIndicator as x } from "../typing-indicator.js";\n'],
      ]),
    );
  });

  it('no toca un módulo cliente ni lo que la fachada no cubre, y falla si falta un nombre', () => {
    const files = new Map([
      ['typing-indicator.js', facade],
      ['_shared/typingindicator.js', 'export { a as t, b as n };\n'],
      ['otro-cliente.js', `'use client';\nimport { t } from "./_shared/typingindicator.js";\n`],
    ]);
    expect(rewriteFacadeImports(files)).toEqual(new Map());

    files.set('servidor.js', 'import { n } from "./_shared/typingindicator.js";\n');
    expect(() => rewriteFacadeImports(files)).toThrow(/no reexporta/);
  });
});
