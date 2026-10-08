/* ─────────────────────────────────────────────────────────────────────────────
 * La frontera cliente/servidor en `dist/`.
 *
 * Una entrada de `clientComponents` sale con `'use client'` en su primera línea:
 * es la frontera que un Server Component necesita para no evaluar `createContext`
 * ni los hooks, que en el grafo de servidor de React no existen. Pero el bundler
 * (rolldown) a menudo deja esa entrada como **fachada** —dos líneas que
 * reexportan— y saca el cuerpo del componente a `dist/_shared/`, que no lleva la
 * directiva: la directiva de un módulo no sobrevive al meterlo en un chunk. Y
 * otra entrada que componga ese componente importa el CUERPO, no la fachada:
 *
 *   dist/assistant-message.js  →  ./_shared/typingindicator.js   (sin frontera)
 *   dist/typing-indicator.js   →  'use client' + reexporta lo anterior
 *
 * Así se rompió `site-footer` en la v51 (`createContext is not a function` en
 * el build de Next). Aquí viven las dos piezas que lo evitan: el post-build
 * reescribe esos imports para que pasen por la fachada (`rewriteFacadeImports`),
 * y el test (`scripts/client-boundary.test.ts`) recorre el `dist/` construido y
 * falla si una entrada de servidor alcanza contexto o hooks sin cruzar una
 * frontera (`findServerHookLeaks`).
 * ───────────────────────────────────────────────────────────────────────────── */
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { posix } from 'node:path';

const USE_CLIENT = /^\s*(['"])use client\1/;

/** El módulo empieza por la directiva `'use client'`: es una frontera. */
export function isClientModule(src) {
  return USE_CLIENT.test(src);
}

/** `a as b, c` → [['a', 'b'], ['c', 'c']]. */
function parseSpecifiers(list) {
  return list
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      const [imported, local] = s.split(/\s+as\s+/);
      return [imported, local ?? imported];
    });
}

/**
 * Si `src` es una fachada —una entrada cliente que solo importa de un chunk
 * compartido y lo reexporta—, devuelve el chunk (relativo a la fachada) y el
 * mapa «nombre en el chunk → nombre público». Si no, `null`.
 */
export function parseFacade(src) {
  if (!isClientModule(src)) return null;
  const body = src
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !USE_CLIENT.test(l) && !/^import ['"][^'"]+\.css['"];?$/.test(l));
  if (body.length !== 2) return null;
  const imp = body[0].match(/^import \{([^}]*)\} from "(\.\/_shared\/[^"]+\.js)";?$/);
  const exp = body[1].match(/^export \{([^}]*)\};?$/);
  if (!imp || !exp) return null;
  const localToChunk = new Map(parseSpecifiers(imp[1]).map(([imported, local]) => [local, imported]));
  const names = new Map();
  for (const [local, exported] of parseSpecifiers(exp[1])) {
    if (!localToChunk.has(local)) return null;
    names.set(localToChunk.get(local), exported);
  }
  return { chunk: imp[2], names };
}

/**
 * Reescribe, en todo módulo que NO es cliente, los imports del cuerpo de una
 * fachada cliente para que pasen por la fachada.
 *
 * @param {Map<string, string>} files ruta posix relativa a `dist/` → código.
 * @returns {Map<string, string>} solo los ficheros que han cambiado.
 */
export function rewriteFacadeImports(files) {
  /** cuerpo (ruta en dist) → { facade: ruta en dist, names } */
  const bodies = new Map();
  for (const [path, src] of files) {
    const facade = parseFacade(src);
    if (!facade) continue;
    const body = posix.join(posix.dirname(path), facade.chunk);
    if (bodies.has(body)) {
      throw new Error(`client-boundary: ${body} es el cuerpo de dos fachadas (${bodies.get(body).facade} y ${path})`);
    }
    bodies.set(body, { facade: path, names: facade.names });
  }

  const changed = new Map();
  for (const [path, src] of files) {
    if (isClientModule(src)) continue;
    const next = src.replace(/import \{([^}]*)\} from "(\.{1,2}\/[^"]+\.js)";/g, (whole, list, spec) => {
      const target = bodies.get(posix.join(posix.dirname(path), spec));
      if (!target) return whole;
      const specifiers = parseSpecifiers(list).map(([imported, local]) => {
        const exported = target.names.get(imported);
        if (!exported) {
          throw new Error(
            `client-boundary: ${path} importa «${imported}» de ${spec}, que la fachada ${target.facade} no reexporta`,
          );
        }
        return exported === local ? exported : `${exported} as ${local}`;
      });
      let rel = posix.relative(posix.dirname(path), target.facade);
      if (!rel.startsWith('.')) rel = `./${rel}`;
      return `import { ${specifiers.join(', ')} } from "${rel}";`;
    });
    if (next !== src) changed.set(path, next);
  }
  return changed;
}

/**
 * La API de React en el grafo de servidor: lo que exporta `react` con la
 * condición `react-server` (la que usa Next en un Server Component). Leída del
 * propio paquete, no de una lista a mano: si React añade o quita algo, el
 * guardián lo sigue.
 */
export function reactServerExports() {
  const require = createRequire(import.meta.url);
  const dir = posix.dirname(require.resolve('react/package.json'));
  return new Set(Object.keys(require(posix.join(dir, 'react.react-server.js'))));
}

/**
 * Lo que un módulo importa de React que no existe en el grafo de servidor
 * (contexto, estado, efectos, refs…), y Base UI, que es todo conducta de
 * cliente.
 */
export function clientOnlyReactImports(src, serverApi) {
  const found = new Set();
  for (const m of src.matchAll(/import\s*\{([^}]*)\}\s*from\s*"react"/g)) {
    for (const [imported] of parseSpecifiers(m[1])) {
      if (!serverApi.has(imported)) found.add(imported);
    }
  }
  if (/\bfrom\s*"@base-ui\/react/.test(src)) found.add('@base-ui/react');
  if (/import\s+(\*\s+as\s+)?\w+\s+from\s*"react"/.test(src)) found.add('import * as React');
  return [...found];
}

/**
 * Recorre `dist/` desde cada entrada que NO es cliente, sin cruzar fronteras
 * (`'use client'`), y devuelve las que alcanzan un módulo con contexto, hooks
 * de cliente o Base UI: `{ entry, module, imports }`.
 */
export function findServerHookLeaks(distDir, entryNames) {
  const serverApi = reactServerExports();
  const leaks = [];
  for (const name of entryNames) {
    const entry = posix.join(distDir, `${name}.js`);
    if (!existsSync(entry) || isClientModule(readFileSync(entry, 'utf-8'))) continue;
    const seen = new Set();
    const stack = [entry];
    while (stack.length) {
      const file = stack.pop();
      if (seen.has(file)) continue;
      seen.add(file);
      const src = readFileSync(file, 'utf-8');
      if (file !== entry && isClientModule(src)) continue;
      const imports = clientOnlyReactImports(src, serverApi);
      if (imports.length) leaks.push({ entry: name, module: posix.relative(distDir, file), imports });
      for (const m of src.matchAll(/(?:from|import)\s*"(\.{1,2}\/[^"]+\.js)"/g)) {
        stack.push(posix.join(posix.dirname(file), m[1]));
      }
    }
  }
  return leaks;
}
